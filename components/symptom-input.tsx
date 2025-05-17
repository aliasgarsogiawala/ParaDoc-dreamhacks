"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MessageBubble from "@/components/chat/message-bubble";

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
  const [messages, setMessages] = useState<Array<{content: string; isUser: boolean; timestamp: string}>>([
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
    
    setInput("");
    setIsLocalLoading(true);

    // Simulate response delay
    setTimeout(() => {
      const botResponse = {
        content: "I'm analyzing your symptoms. Please check the Simulated Outcomes section below for detailed results.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLocalLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1 flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-rose-500" />
          Health Consultation
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Describe your symptoms and I'll analyze possible conditions
        </p>
      </div>

      <div className="bg-rose-50/50 dark:bg-slate-900/50 rounded-lg p-4 mb-4 h-[350px] overflow-y-auto flex flex-col space-y-2 border border-rose-100 dark:border-slate-700">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            content={msg.content}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}
        
        {isLoading && (
          <MessageBubble
            content=""
            isUser={false}
            isLoading={true}
          />
        )}
        
        {/* Scroll anchor */}
        <div className="h-4" />
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 rounded-lg blur-sm opacity-70"></div>
        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg border border-rose-100 dark:border-slate-700 overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-3 rounded-r-lg"
            disabled={!input.trim()}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
