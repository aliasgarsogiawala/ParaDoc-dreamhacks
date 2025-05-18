// Update the component to handle API responses within the chat

import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { SendHorizontal, LucideIcon } from "lucide-react";
import { generateMedicalSimulation, SimulationResult } from "@/utils/gemini-api";
import { AvatarImage } from "@radix-ui/react-avatar";

// Add this at the top of your component
type SymptomInputProps = {
  selectedCategory?: string | null;
  onSubmit?: (symptom: string) => void;
  isLoading?: boolean;
};

export default function SymptomInput({ 
  selectedCategory, 
  onSubmit,
  isLoading: externalLoading = false 
}: SymptomInputProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{content: string; isUser: boolean; timestamp: string; simulationData?: SimulationResult}>>([
    {
      content: "Hello! I'm ParaDoc, your health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  
  // Use either external or local loading state
  const isLoading = externalLoading || isLocalLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit(input);
    }
    
    const symptom = input;
    setInput("");
    setIsLocalLoading(true);

try {
  // Call the Gemini API
  const processingMessage = {
    content: "I'm analyzing your symptoms and generating possible outcomes...",
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  };
  
  // Add a processing message
  setMessages(prev => [...prev, processingMessage]);
  
  // Call the API
  let result;
  try {
    result = await generateMedicalSimulation(symptom);
    console.log("API result:", result); // Log the result for debugging
  } catch (apiError) {
    console.error("API error:", apiError);
    throw apiError; // Re-throw to be caught by outer catch
  }
  
  // Check if result has the expected structure
  if (!result || !result.paths) {
    console.warn("API returned unexpected data structure:", result);
    // Create a fallback result with placeholder data
    result = {
      paths: [
        {
          id: "path-a",
          title: "Do nothing",
          description: "If you choose to wait and see without seeking medical attention.",
          days: [
            { day: 1, event: "Symptoms may continue" },
            { day: 3, event: "Condition could worsen without treatment" },
            { day: 7, event: "Possible complications may develop" }
          ],
          riskScore: 65,
          recoveryChance: 40
        },
        {
          id: "path-b",
          title: "Seek medical attention",
          description: "If you consult with a healthcare professional promptly.",
          days: [
            { day: 1, event: "Professional medical assessment" },
            { day: 3, event: "Treatment begins based on diagnosis" },
            { day: 7, event: "Likely improvement with proper care" }
          ],
          riskScore: 20,
          recoveryChance: 85
        },
        {
          id: "path-c",
          title: "Self-treatment",
          description: "If you try over-the-counter remedies without professional guidance.",
          days: [
            { day: 1, event: "Begin self-treatment regimen" },
            { day: 3, event: "Symptoms may be temporarily masked" },
            { day: 7, event: "Underlying issue may remain unaddressed" }
          ],
          riskScore: 45,
          recoveryChance: 60
        }
      ],
      recommendation: "Based on your symptoms, consulting with a healthcare professional is recommended for proper diagnosis and treatment.",
      disclaimer: "This is a simulation based on limited information and should not replace professional medical advice. Always consult with a healthcare provider for health concerns."
    };
  }
  
  // Format the simulation data into a chat message
  const resultMessage = {
    content: formatSimulationResult(result),
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    simulationData: result
  };
  
  // Replace the processing message with the result
  setMessages(prev => [...prev.slice(0, -1), resultMessage]);
  
} catch (error) {
      console.error("Error generating simulation:", error);
      
      // Show error message
      const errorMessage = {
        content: `I apologize, but I encountered an error while analyzing your symptoms. Please try again later.${error instanceof Error ? ' Error: ' + error.message : ''}`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      // Replace the processing message with the error
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLocalLoading(false);
    }
  };

  // Helper function to format simulation results into a readable message
const formatSimulationResult = (result: SimulationResult): string => {
  // Check if result is defined and has paths
  if (!result || !result.paths || !Array.isArray(result.paths)) {
    return "**I couldn't generate health simulations for your symptoms.**\n\nThe response data is incomplete. Please try again or provide more details about your symptoms.";
  }
  
  let message = `**Based on your symptom description, I've analyzed three possible outcomes:**\n\n`;
  
  // Add each path
  result.paths.forEach(path => {
    message += `**${path.title || 'Unknown Path'}**\n`;
    message += `${path.description || 'No description available'}\n`;
    message += `• Risk Score: ${path.riskScore !== undefined ? path.riskScore : 'Unknown'}%\n`;
    message += `• Recovery Chance: ${path.recoveryChance !== undefined ? path.recoveryChance : 'Unknown'}%\n`;
    
    // Only add timeline if days exist
    if (path.days && Array.isArray(path.days) && path.days.length > 0) {
      message += `• Timeline:\n`;
      path.days.forEach(day => {
        message += `  - Day ${day.day || '?'}: ${day.event || 'Unknown event'}\n`;
      });
    } else {
      message += `• Timeline: Not available\n`;
    }
    
    message += `\n`;
  });
  
  // Add recommendation if available
  if (result.recommendation) {
    message += `**💡 Recommendation:**\n${result.recommendation}\n\n`;
  } else {
    message += `**💡 Recommendation:**\nConsult with a healthcare professional for proper diagnosis and treatment.\n\n`;
  }
  
  // Add disclaimer if available, otherwise use a default one
  const disclaimer = result.disclaimer || 'This is a simulation and not medical advice. Always consult with a healthcare professional for medical concerns.';
  message += `_${disclaimer}_`;
  
  return message;
};

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          ParaDoc Consultation
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Describe your symptoms and I'll analyze possible outcomes.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow-inner p-4 mb-4 h-[350px] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? 'bg-rose-500 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {!msg.isUser && (
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarImage src="/images/paradoc-avatar.png" alt="ParaDoc" />
                    <div className="bg-rose-200 dark:bg-rose-700 h-full w-full rounded-full flex items-center justify-center text-xs">P</div>
                  </Avatar>
                )}
                <span className={`text-xs ${msg.isUser ? 'text-rose-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {msg.isUser ? 'You' : 'ParaDoc'} • {msg.timestamp}
                </span>
              </div>
              <div className={`text-sm whitespace-pre-wrap ${msg.isUser ? '' : 'text-gray-800 dark:text-gray-200'}`}>
                {msg.content.split('\n').map((line, i) => {
                  // Handle markdown-style bold text with **
                  const boldPattern = /\*\*(.*?)\*\*/g;
                  const processedLine = line.replace(boldPattern, '<strong>$1</strong>');
                  
                  // Handle markdown-style italics with _
                  const italicPattern = /_(.*?)_/g;
                  const finalProcessedLine = processedLine.replace(italicPattern, '<em>$1</em>');
                  
                  return (
                    <p 
                      key={i} 
                      className="mb-1"
                      dangerouslySetInnerHTML={{ __html: finalProcessedLine }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Describe your symptoms${selectedCategory ? ` (${selectedCategory})` : ''}...`}
          className="flex-1 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-3 text-gray-700 dark:text-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-l-none bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-medium px-4 h-[46px]"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendHorizontal size={18} />
          )}
        </Button>
      </form>
    </div>
  );
}