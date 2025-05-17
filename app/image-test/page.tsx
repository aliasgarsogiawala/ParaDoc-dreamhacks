'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/header";
import ThemeToggle from "@/components/theme-toggle";
import BackgroundGradient from "@/components/ui-elements/background-gradient";
import PageTransition from "@/components/animations/page-transition";

export default function ImageGenerationTest() {
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

const generateImage = async () => {
  if (!prompt.trim()) {
    setError('Please enter an image prompt');
    return;
  }

  setLoading(true);
  setError(null);
  setImageData(null);
  
  try {
    // CHANGE THIS LINE to use the test-image endpoint instead
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    const data = await response.json();
    console.log("Response from image generation:", data);
    
    if (data.status === 'success' && data.data && data.data.imageData) {
      setImageData(data.data.imageData);
      
      // If it used a fallback, show a note
      if (data.data.usedFallback) {
        setError(`Note: Using fallback image (${data.data.fallbackReason || 'unknown reason'})`);
      }
    } else {
      setError(data.data?.error || data.message || 'Failed to generate image');
    }
  } catch (err) {
    console.error("Error in image generation request:", err);
    setError(err instanceof Error ? err.message : 'An unknown error occurred');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-off-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      <BackgroundGradient />
      <PageTransition>
        <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <Header />
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
          
          <div className="max-w-3xl mx-auto mt-16">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Health Timeline Visualization Test
            </h1>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Generate Medical Timeline Visualization
              </h2>
              
              <div className="mb-4">
                <label 
                  htmlFor="prompt" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Enter a health scenario to visualize:
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A timeline showing deterioration of mild chest pain over 7 days when left untreated"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-700 dark:text-white p-3 h-24"
                />
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Suggested test prompts:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-blue-600 dark:text-blue-400">
                  <li>"A timeline showing deterioration of mild chest pain over 7 days when left untreated"</li>
                  <li>"A medical illustration of gradual recovery from a minor injury with proper treatment"</li>
                  <li>"A conceptual health timeline showing symptom progression for an untreated persistent cough"</li>
                </ul>
              </div>
              
              <button
                onClick={generateImage}
                disabled={loading || !prompt.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Image...
                  </>
                ) : 'Generate Visualization'}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
                {error}
              </div>
            )}

            {imageData && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Generated Visualization</h2>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                  <Image 
                    src={`data:image/png;base64,${imageData}`}
                    alt="Generated health timeline visualization"
                    width={800}
                    height={500}
                    className="mx-auto object-contain"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <p>This is a test visualization for health timeline representation only.</p>
                  <p className="mt-1">Not medical advice. For educational purposes only.</p>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Link 
                href="/"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}