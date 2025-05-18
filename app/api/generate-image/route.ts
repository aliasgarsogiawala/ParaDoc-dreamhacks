import { NextResponse } from 'next/server';
import { generateHealthImage, generateTimelineVisualizations, testImageGeneration } from '@/lib/gemini-img';
import { generateHealthTimelines } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Check which type of request this is
    if (body.prompt) {
      // This is a direct image generation test
      console.log("Processing direct image generation request with prompt:", body.prompt);
      
      // For testing, we'll use a predefined risk percentage
      const riskPercentage = body.riskPercentage || 50;
      
      // Generate image with fallback mechanism
      const result = await generateHealthImage(body.prompt, riskPercentage);
      
      return NextResponse.json({
        status: 'success',
        data: result
      });
    } 
    else if (body.symptom) {
      // This is a timeline generation request
      console.log("Processing timeline generation request for symptom:", body.symptom);
      
      // First generate the text timelines
      const timelines = await generateHealthTimelines(body.symptom, body.choices);
      
      // Then generate/attach images to the timelines
      const enhancedTimelines = await generateTimelineVisualizations(timelines);
      
      return NextResponse.json({
        status: 'success',
        data: enhancedTimelines.success ? enhancedTimelines.data : timelines
      });
    }
    else {
      // Invalid request
      return NextResponse.json({
        status: 'error',
        message: 'Invalid request. Please provide either "prompt" or "symptom" parameter.'
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in generate-image API route:", error);
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      details: JSON.stringify(error, null, 2)
    }, { status: 500 });
  }
}