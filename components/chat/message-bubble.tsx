import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

type MessageBubbleProps = {
  content: string;
  isUser: boolean;
  timestamp?: string;
  avatar?: string;
  isLoading?: boolean;
};

export default function MessageBubble({
  content,
  isUser,
  timestamp,
  avatar,
  isLoading = false,
}: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-rose-200 dark:border-rose-800 shadow-sm">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-rose-400 to-pink-500 text-white">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm",
            isUser
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-tr-none"
              : "bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-700 rounded-tl-none"
          )}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-rose-200 dark:bg-rose-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-rose-200 dark:bg-rose-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-rose-200 dark:bg-rose-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          ) : (
            <p className="text-sm">{content}</p>
          )}
        </div>
        
        {timestamp && (
          <span className={cn(
            "text-xs mt-1 text-gray-500 dark:text-gray-400",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp}
          </span>
        )}
      </div>

      {isUser && (
        <Avatar className="h-10 w-10 border-2 border-rose-200 dark:border-rose-800 shadow-sm">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white">
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}