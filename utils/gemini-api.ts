/**
 * Utility functions for interacting with the Gemini API
 */

export type TimelineChoice = 'do nothing' | 'seek medical attention' | 'self-medicate with over-the-counter remedies';

export type PathDay = {
  day: number;
  event: string;
};

export type SimulationPath = {
  id: string;
  title: string;
  description: string;
  days: PathDay[];
  riskScore: number;
  recoveryChance: number;
};

export type SimulationResult = {
  paths: SimulationPath[];
  recommendation: string;
  disclaimer: string;
};

/**
 * Generates medical simulation based on the provided symptom description
 * 
 * @param symptom The user's symptom description
 * @param choices Array of choices to simulate different timelines
 * @returns The simulated timeline results from the API
 */
export async function generateMedicalSimulation(
  symptom: string, 
  choices: TimelineChoice[] = ['do nothing', 'seek medical attention', 'self-medicate with over-the-counter remedies']
): Promise<SimulationResult> {
  try {
    const response = await fetch('/api/test-gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptom,
        choices
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to generate simulations');
    }
  } catch (error) {
    console.error('Error in generateMedicalSimulation:', error);
    throw error;
  }
}

/**
 * Tests the Gemini API connection
 * @returns Test results from the API
 */
export async function testGeminiConnection() {
  try {
    const response = await fetch('/api/test-gemini');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to test API connection');
    }
  } catch (error) {
    console.error('Error in testGeminiConnection:', error);
    throw error;
  }
}