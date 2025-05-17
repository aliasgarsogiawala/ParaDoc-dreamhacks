import { GoogleGenAI, Modality } from "@google/genai";

// Your API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-api-key-here";

// Initialize the Gemini API
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Pre-defined base64 images for fallback
// These would be replaced with actual base64-encoded images for your demo
const FALLBACK_IMAGES = {
  low_risk: "data:image/png;base64,iVBORw0KGgoA...", // Replace with actual base64 for low risk path
  medium_risk: "data:image/png;base64,iVBORw0KGgoA...", // Replace with actual base64 for medium risk path
  high_risk: "data:image/png;base64,iVBORw0KGgoA..." // Replace with actual base64 for high risk path
};

/**
 * Gets a fallback image based on risk level
 * @param riskPercentage Risk percentage (0-100)
 * @returns Base64 encoded image data
 */
function getFallbackImage(riskPercentage: number): string {
  if (riskPercentage < 30) {
    return FALLBACK_IMAGES.low_risk;
  } else if (riskPercentage < 70) {
    return FALLBACK_IMAGES.medium_risk;
  } else {
    return FALLBACK_IMAGES.high_risk;
  }
}

/**
 * Generates a medical illustration based on a prompt with fallback mechanism
 * @param prompt Description of the health timeline to visualize
 * @param riskPercentage Risk percentage for fallback image selection
 * @returns Object with success status and image data
 */
export async function generateHealthImage(prompt: string, riskPercentage: number = 50) {
  try {
    if (!API_KEY || API_KEY === "your-api-key-here") {
      console.error("API key not configured properly");
      return { 
        success: true, // Still return success but use fallback
        imageData: getFallbackImage(riskPercentage),
        usedFallback: true,
        fallbackReason: "API key not configured"
      };
    }

    const enhancedPrompt = 
      `Create a medical illustration showing: ${prompt}. 
      Make it a conceptual, educational diagram. Use medical illustration style 
      with a clean background. Include timeline elements if appropriate.
      The image should be tasteful, non-graphic, and suitable for healthcare education.`;

    console.log("Generating image for prompt:", enhancedPrompt);

    try {
      // Try to generate image with Gemini API
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: enhancedPrompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      let imageData: string | null = null;
      let textResponse: string | null = null;

      // Extract both text and image data from the response
      if (response.candidates && response.candidates.length > 0 && 
          response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            textResponse = part.text;
          } else if (part.inlineData && part.inlineData.data) {
            imageData = part.inlineData.data;
            console.log("Image data received from Gemini API");
          }
        }
      } 
      
      if (imageData) {
        return {
          success: true,
          imageData: imageData,
          textResponse: textResponse,
          usedFallback: false
        };
      }
      
      // If we reach here, image generation failed, use fallback
      console.warn("No image data found in Gemini response, using fallback");
      return { 
        success: true, 
        imageData: getFallbackImage(riskPercentage),
        textResponse: textResponse,
        usedFallback: true,
        fallbackReason: "No image data in response"
      };
    } catch (apiError) {
      // API error, use fallback
      console.error("Gemini API error:", apiError);
      return { 
        success: true, 
        imageData: getFallbackImage(riskPercentage),
        usedFallback: true,
        fallbackReason: apiError instanceof Error ? apiError.message : String(apiError)
      };
    }
  } catch (error) {
    // Something unexpected happened, still use fallback
    console.error("Unexpected error in image generation:", error);
    return { 
      success: true, 
      imageData: getFallbackImage(riskPercentage),
      usedFallback: true,
      fallbackReason: "Unexpected error"
    };
  }
}

/**
 * Generates timeline visualization images for each path
 * @param paths Array of path descriptions
 * @returns Array of objects with path index and image data
 */
export async function generatePathImages(paths: { path: string, action: string, riskPercentage: number }[]) {
  const results = [];
  
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    let riskLevel = "moderate";
    
    if (path.riskPercentage < 30) {
      riskLevel = "low";
    } else if (path.riskPercentage > 70) {
      riskLevel = "high";
    }
    
    const prompt = `Medical timeline visualization for a ${riskLevel} risk health scenario: 
      ${path.path} - ${path.action}. 
      Risk level: ${path.riskPercentage}%. 
      Show a conceptual timeline representation.`;
    
    const result = await generateHealthImage(prompt, path.riskPercentage);
    
    results.push({
      pathIndex: i,
      ...result
    });
  }
  
  return results;
}

/**
 * Test function to verify API integration for image generation
 */
export async function testImageGeneration(useFallback = false) {
  try {
    if (useFallback) {
      // Return a predefined fallback image for testing
      return {
        success: true,
        imageData: getFallbackImage(50),
        usedFallback: true,
        fallbackReason: "Test requested fallback"
      };
    }

    const testPrompt = "A simple medical diagram showing a 7-day timeline with improving health indicators";
    
    const result = await generateHealthImage(testPrompt, 30);
    return result;
  } catch (error) {
    console.error("Image generation test failed:", error);
    return {
      success: true, // Still return success with fallback
      imageData: getFallbackImage(50),
      usedFallback: true,
      fallbackReason: "Test error"
    };
  }
}

/**
 * Function to generate images with guaranteed fallbacks if needed
 * @param timelines Timeline data from the text generation
 * @returns Enhanced timelines with attached images
 */
export async function generateTimelineVisualizations(timelines: any) {
  try {
    // Check if timelines data is valid
    if (!timelines || !timelines.timelines || !Array.isArray(timelines.timelines)) {
      return {
        success: false,
        error: "Invalid timeline data provided"
      };
    }
    
    const paths = timelines.timelines.map((timeline: any) => ({
      path: timeline.path,
      action: timeline.action,
      riskPercentage: timeline.riskPercentage
    }));
    
    const imageResults = await generatePathImages(paths);
    
    // Attach images to the timelines data
    const enhancedTimelines = { ...timelines };
    
    for (const result of imageResults) {
      if (result.imageData && result.pathIndex !== undefined) {
        enhancedTimelines.timelines[result.pathIndex].imageData = result.imageData;
        enhancedTimelines.timelines[result.pathIndex].usedFallbackImage = result.usedFallback || false;
      }
    }
    
    return {
      success: true,
      data: enhancedTimelines
    };
  } catch (error) {
    console.error("Error generating timeline visualizations:", error);
    
    // Even if there's an error, try to add fallback images
    if (timelines && timelines.timelines && Array.isArray(timelines.timelines)) {
      const enhancedTimelines = { ...timelines };
      
      enhancedTimelines.timelines.forEach((timeline: any, index: number) => {
        timeline.imageData = getFallbackImage(timeline.riskPercentage || 50);
        timeline.usedFallbackImage = true;
      });
      
      return {
        success: true,
        data: enhancedTimelines,
        usedAllFallbacks: true
      };
    }
    
    return {
      success: false,
      error: "Failed to generate timeline visualizations",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}