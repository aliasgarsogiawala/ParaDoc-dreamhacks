import { SimulationResult, TimelineChoice } from "@/utils/gemini-api";
import { AvatarImage } from "@radix-ui/react-avatar";
import { SendHorizontal, StopCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";

// Add this at the top of your component
// Update the SymptomInputProps type
type SymptomInputProps = {
  selectedCategory?: string | null;
  onSubmit?: (symptom: string) => void;
  onSimulationResult?: (result: ResultData) => void; // Add this line
  isLoading?: boolean;
};

// Define the structure that matches result.json
interface Timeline {
  path: string;
  action: string;
  days: Array<{
    day: number;
    description: string;
  }>;
  riskPercentage: number;
  recoveryPercentage: number;
}

// Export the interface so it can be imported in other files
export interface ResultData {
  timelines: Timeline[];
  bestPath: {
    pathIndex: number;
    explanation: string;
  };
  disclaimer: string;
}

import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SymptomInput({
  selectedCategory,
  onSubmit,
  onSimulationResult, // Add this parameter
  isLoading: externalLoading = false,
}: SymptomInputProps) {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      content: string;
      isUser: boolean;
      timestamp: string;
      simulationData?: any;
    }>
  >([
    {
      content:
        "Hello! I'm ParaDoc, your health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  // Add a ref to store the current abort controller
  const abortControllerRef = useRef<AbortController | null>(null);

  // Create a ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use either external or local loading state
  const isLoading = externalLoading || isLocalLoading;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Get the parent container (chat window)
      const chatContainer = messagesEndRef.current.parentElement;

      // Only scroll the chat container, not the whole page
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  };

  // Add a function to handle cancellation
  const handleCancelSubmission = () => {
    toast.loading("Cancelling request...");

    // Abort the fetch request if there's an active controller
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Update the UI state
    setIsLocalLoading(false);

    // Remove the processing message if it exists
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (
        !lastMessage.isUser &&
        lastMessage.content.includes("analyzing your symptoms")
      ) {
        return prev.slice(0, -1);
      }
      return prev;
    });

    // Add a cancellation message
    setMessages((prev) => [
      ...prev,
      {
        content: "Request cancelled. Feel free to ask another question.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Call the onSubmit prop if provided
    if (onSubmit) {
      onSubmit(input);
    }

    // Prepare symptom with category context if available
    const symptomWithContext = selectedCategory
      ? `[Category: ${selectedCategory}] ${input}`
      : `[Category: General] ${input}`;

    setInput("");
    setIsLocalLoading(true);

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Call the Gemini API
      const processingMessage = {
        content:
          "I'm analyzing your symptoms and generating possible outcomes...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Add a processing message
      setMessages((prev) => [...prev, processingMessage]);

      // Call the API with the abort signal
      let result;
      try {
        result = await generateMedicalSimulationWithAbort(
          symptomWithContext,
          signal
        );
        console.log("API result:", result); // Log the result for debugging
        
        // Check if the result matches the ResultData structure
        if (result && 'timelines' in result && Array.isArray(result.timelines) && onSimulationResult) {
          onSimulationResult(result as unknown as ResultData);
        }

        toast.success("Symptoms processed successfully!");
      } catch (apiError) {
        toast.error("Failed to process symptoms. Please try again.");
        console.error("API error:", apiError);
        // Check if this is an abort error
        if (apiError instanceof Error && apiError.name === "AbortError") {
          console.log("Request was aborted");
          return; // Exit early, the cancel handler will update the UI
        }
        throw apiError; // Re-throw to be caught by outer catch
      }

      // Format the simulation data into a chat message
      const resultMessage = {
        content: formatSimulationResult(result),
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        simulationData: result,
      };

      // Replace the processing message with the result
      setMessages((prev) => [...prev.slice(0, -1), resultMessage]);
    } catch (error) {
      console.error("Error generating simulation:", error);

      // Show error message
      const errorMessage = {
        content: `I apologize, but I encountered an error while analyzing your symptoms. Please try again later.${
          error instanceof Error ? " Error: " + error.message : ""
        }`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Replace the processing message with the error
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLocalLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Helper function to format simulation results into a readable message
  const formatSimulationResult = (result: any): string => {
    // Check if result has the expected structure from result.json
    if (result && result.timelines && Array.isArray(result.timelines)) {
      // This is the structure from result.json
      const data = result as ResultData;

      let message = `**Based on your symptom description, I've analyzed ${data.timelines.length} possible outcomes:**\n\n`;

      // Add each timeline
      data.timelines.forEach((timeline, index) => {
        const isBestPath = index === data.bestPath.pathIndex;

        message += `**${timeline.path}** ${
          isBestPath ? "✅ (Recommended)" : ""
        }\n`;
        message += `${timeline.action}\n`;
        message += `• Risk: ${timeline.riskPercentage}%\n`;
        message += `• Recovery Chance: ${timeline.recoveryPercentage}%\n`;

        // Add timeline days
        if (timeline.days && Array.isArray(timeline.days)) {
          message += `• Timeline:\n`;
          timeline.days.forEach((day) => {
            message += `  - Day ${day.day}: ${day.description}\n`;
          });
        }

        message += `\n`;
      });

      // Add best path explanation
      if (data.bestPath && data.bestPath.explanation) {
        message += `**💡 Recommendation:**\n${data.bestPath.explanation}\n\n`;
      }

      // Add disclaimer
      if (data.disclaimer) {
        message += `_${data.disclaimer}_`;
      } else {
        message += `_This is a simulation and not medical advice. Always consult with a healthcare professional for medical concerns._`;
      }

      return message;
    } else if (result && result.paths && Array.isArray(result.paths)) {
      // This is the old structure that might come from the API
      const oldData = result as SimulationResult;

      let message = `**Based on your symptom description, I've analyzed possible outcomes:**\n\n`;

      // Add each path
      oldData.paths.forEach((path) => {
        message += `**${path.title || "Unknown Path"}**\n`;
        message += `${path.description || "No description available"}\n`;
        message += `• Risk Score: ${
          path.riskScore !== undefined ? path.riskScore : "Unknown"
        }%\n`;
        message += `• Recovery Chance: ${
          path.recoveryChance !== undefined ? path.recoveryChance : "Unknown"
        }%\n`;

        // Only add timeline if days exist
        if (path.days && Array.isArray(path.days) && path.days.length > 0) {
          message += `• Timeline:\n`;
          path.days.forEach((day) => {
            message += `  - Day ${day.day || "?"}: ${
              day.event || "Unknown event"
            }\n`;
          });
        } else {
          message += `• Timeline: Not available\n`;
        }

        message += `\n`;
      });

      // Add recommendation if available
      if (oldData.recommendation) {
        message += `**💡 Recommendation:**\n${oldData.recommendation}\n\n`;
      } else {
        message += `**💡 Recommendation:**\nConsult with a healthcare professional for proper diagnosis and treatment.\n\n`;
      }

      // Add disclaimer if available, otherwise use a default one
      const disclaimer =
        oldData.disclaimer ||
        "This is a simulation and not medical advice. Always consult with a healthcare professional for medical concerns.";
      message += `_${disclaimer}_`;

      return message;
    }

    // Fallback for unexpected data structure
    return "**I couldn't generate health simulations for your symptoms.**\n\nThe response data is incomplete. Please try again or provide more details about your symptoms.";
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 font-heading">
          ParaDoc Consultation
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 font-body">
          Describe your symptoms and I'll analyze possible outcomes.
        </p>
      </div>

      <div
        className={`bg-gradient-to-br from-slate-50 to-rose-50 dark:from-slate-800/70 dark:to-slate-800/50 rounded-lg shadow-inner p-4 mb-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          messages.length <= 2
            ? "h-[350px]"
            : messages.length <= 4
            ? "h-[450px]"
            : "h-[650px]"
        }`}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex ${
              msg.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 shadow-md transition-all duration-200 ${
                msg.isUser
                  ? "bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-tr-none transform hover:scale-[1.01]"
                  : "bg-white dark:bg-slate-700/90 shadow-sm border border-slate-100 dark:border-slate-600 rounded-tl-none transform hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.isUser && user && (
                  <Avatar className="h-6 w-6 mr-2 ring-2 ring-rose-200 dark:ring-rose-500 ring-offset-1">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                    />
                    <div className="bg-gradient-to-br from-rose-300 to-rose-200 dark:from-rose-600 dark:to-rose-700 h-full w-full rounded-full flex items-center justify-center text-xs font-medium">
                      {user.firstName?.[0] || "U"}
                    </div>
                  </Avatar>
                )}
                <span
                  className={`text-xs font-medium ${
                    msg.isUser
                      ? "text-rose-100"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {msg.isUser ? user?.fullName || "You" : "ParaDoc"} •{" "}
                  {msg.timestamp}
                </span>
              </div>
              <div
                className={`text-sm whitespace-pre-wrap ${
                  msg.isUser ? "" : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.content.split("\n").map((line, i) => {
                  // Handle markdown-style bold text with **
                  const boldPattern = /\*\*(.*?)\*\*/g;
                  const processedLine = line.replace(
                    boldPattern,
                    "<strong class='font-semibold text-xl line-clamp-1 pt-4 text-rose-700 dark:text-rose-300'>$1</strong>"
                  );

                  // Handle markdown-style italics with _
                  const italicPattern = /_(.*?)_/g;
                  const finalProcessedLine = processedLine.replace(
                    italicPattern,
                    "<em class='text-gray-600 dark:text-gray-400 italic'>$1</em>"
                  );

                  // Handle bullet points
                  const bulletPattern = /^• (.*)/g;
                  const withBullets = finalProcessedLine.replace(
                    bulletPattern,
                    "<span class='flex items-start'><span class='text-rose-500 dark:text-rose-400 mr-1'>•</span><span>$1</span></span>"
                  );

                  return (
                    <p
                      key={i}
                      className="mb-1.5"
                      dangerouslySetInnerHTML={{ __html: withBullets }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        {/* Empty div at the end for scrolling to */}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Describe your symptoms${
            selectedCategory ? ` (${selectedCategory})` : ""
          }...`}
          className="flex-1 rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 p-3 text-gray-700 dark:text-gray-200 shadow-inner focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 font-body transition-all duration-200"
          disabled={isLoading}
        />
        {isLoading ? (
          <Button
            type="button"
            onClick={handleCancelSubmission}
            className="rounded-l-none bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 dark:from-red-600 dark:to-red-500 dark:hover:from-red-700 dark:hover:to-red-600 text-white font-medium px-4 h-[46px] transition-all duration-200 shadow-md"
          >
            <div className="flex items-center">
              <StopCircleIcon
                size={18}
                className="transform hover:translate-x-0.5 transition-transform scale-150"
              />
            </div>
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!input.trim()}
            className="rounded-l-none bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-600 hover:to-rose-500 dark:from-rose-600 dark:to-rose-500 dark:hover:from-rose-700 dark:hover:to-rose-600 text-white font-medium px-4 h-[46px] transition-all duration-200 shadow-md"
          >
            <SendHorizontal
              size={18}
              className="transform hover:translate-x-0.5 transition-transform"
            />
          </Button>
        )}
      </form>
    </div>
  );
}

// Add this function to your component or import it from utils/gemini-api.ts
const generateMedicalSimulationWithAbort = async (
  symptom: string,
  signal?: AbortSignal,
  choices: TimelineChoice[] = [
    "do nothing",
    "seek medical attention",
    "self-medicate with over-the-counter remedies",
  ]
): Promise<SimulationResult> => {
  try {
    const response = await fetch("/api/test-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptom,
        choices,
      }),
      signal, // Pass the abort signal to fetch
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to generate simulations");
    }
  } catch (error) {
    console.error("Error in generateMedicalSimulation:", error);
    throw error;
  }
};
