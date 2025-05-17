import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Your API key
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyBAUTXDurFPYf7FRmV1sLzOFkR_O-awjpg";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

// Safety settings for medical content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

export async function generateHealthTimelines(symptom: string, choices: string[] = ["do nothing", "seek professional help", "self-medicate"]) {
  try {
    if (!API_KEY || API_KEY === "your-api-key-here") {
      console.error("API key not configured properly");
      return { 
        error: "API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.",
        details: "Configuration Error" 
      };
    }
    // For Gemini Pro
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", safetySettings });

    const prompt = `
    You are a medical simulation AI that shows possible future outcomes for health conditions based on different courses of action. 
    
    SYMPTOM DESCRIPTION: "${symptom}"

    Generate three different 7-day timelines showing how this condition might progress under these three different scenarios:
    1. If the patient chooses to: ${choices[0]}
    2. If the patient chooses to: ${choices[1]}
    3. If the patient chooses to: ${choices[2]}

    For each timeline:
    - Show what might happen on days 1, 3, 5, and 7
    - Include symptom progression, potential complications, and effects on daily life
    - Assign a risk percentage (0-100%) indicating the overall risk of this approach
    - Assign a recovery percentage (0-100%) indicating likely recovery with this approach

    Finally, provide a "BEST PATH" recommendation with a brief justification.

    Format the response as a JSON object with the following structure:
    {
      "timelines": [
        {
          "path": "Path name (e.g., 'Do Nothing')",
          "action": "The action taken",
          "days": [
            {"day": 1, "description": "What happens on day 1"},
            {"day": 3, "description": "What happens on day 3"},
            {"day": 5, "description": "What happens on day 5"},
            {"day": 7, "description": "What happens on day 7"}
          ],
          "riskPercentage": 75,
          "recoveryPercentage": 25
        },
        // Two more timelines here
      ],
      "bestPath": {
        "pathIndex": 0, // Index of the recommended path (0, 1, or 2)
        "explanation": "Explanation of why this is the best path"
      }
    }
    
    IMPORTANT: Include a clear disclaimer at the end that this is not professional medical advice.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
    const jsonData = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
    
    try {
      return JSON.parse(jsonData);
    } catch (e) {
      console.error("Failed to parse JSON from Gemini response", e);
      console.log("Raw response:", text);
      return { 
        error: "Failed to parse timeline data", 
        rawResponse: text 
      };
    }
  } catch (error) {
    console.error("Error generating health timelines:", error);
    return { 
      error: "Failed to generate timelines. Please try again.", 
      details: error instanceof Error ? error.message : String(error)
    };
  }
}

// Test function to verify API integration
export async function testGeminiAPI() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello, can you confirm this API test is working?");
    const response = await result.response;
    return {
      success: true,
      message: response.text(),
    };
  } catch (error) {
    console.error("Gemini API test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Add this function at the end of the file
export async function debugGeminiAPI() {
  try {
    // Check if API key is set
    if (!API_KEY || API_KEY === "your-api-key-here") {
      return {
        success: false,
        error: "API key not configured properly",
        details: "Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables"
      };
    }

    // Try to create model instance (will fail if API key is invalid)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Simple test prompt
    const result = await model.generateContent("Reply with only the word 'SUCCESS' if you can see this message.");
    
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      message: text,
      apiKeyConfigured: API_KEY !== "your-api-key-here"
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: JSON.stringify(error, null, 2)
    };
  }
}