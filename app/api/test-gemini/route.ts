import { NextResponse } from 'next/server';
import { testGeminiAPI, generateHealthTimelines, debugGeminiAPI } from '@/lib/gemini';

export async function GET() {
  try {
    const testResult = await testGeminiAPI();
    
    return NextResponse.json({
      status: 'success',
      data: testResult
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symptom, choices, includeImages = true } = body;
    
    if (!symptom) {
      return NextResponse.json({
        status: 'error',
        message: 'Symptom description is required'
      }, { status: 400 });
    }
    
    const timelines = await generateHealthTimelines(symptom, choices);
    
    return NextResponse.json({
      status: 'success',
      data: timelines
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}