// filepath: d:\Projects\Dream Hacks\dreamhacks\app\test-gemini\page.tsx
'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function TestGemini() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [symptom, setSymptom] = useState('');
  const [error, setError] = useState<string | null>(null);

  const testAPIConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-gemini');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateTimelines = async () => {
    if (!symptom.trim()) {
      setError('Please enter a symptom description');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptom,
          choices: ['do nothing', 'seek medical attention', 'self-medicate with over-the-counter remedies']
        }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white dark:bg-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Gemini API Test</h1>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Test API Connection</h2>
          <button
            onClick={testAPIConnection}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Test Timeline Generation</h2>
          
          <div className="mb-4">
            <label htmlFor="symptom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter a symptom description:
            </label>
            <textarea
              id="symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="e.g., I've had a mild chest pain on and off for a few days, but I exercise regularly. No shortness of breath."
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-slate-700 dark:text-white p-3 h-24"
            />
          </div>
          
          <button
            onClick={generateTimelines}
            disabled={loading || !symptom.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Timelines'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Result</h2>
            <pre className="bg-gray-100 dark:bg-slate-700 p-4 rounded-md overflow-auto text-sm max-h-[400px]">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}