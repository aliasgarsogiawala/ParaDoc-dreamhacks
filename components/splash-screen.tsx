"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HeartPulse } from "lucide-react"
import { useEffect, useState } from "react"

// Humorous loading messages
const loadingMessages = [
  "Sterilizing virtual equipment...",
  "Calibrating medical sensors...",
  "Brewing doctor's coffee...",
  "Organizing digital stethoscopes...",
  "Charging defibrillator...",
  "Polishing virtual scalpels...",
  "Warming up the MRI machine...",
  "Feeding the lab mice...",
  "Updating medical knowledge...",
  "Checking patient vitals...",
  "Reviewing medical journals...",
  "Counting pills...",
  "Washing virtual hands...",
  "Putting on lab coats..."
]

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Multi-phase animation sequence
    const phaseTimers = [
      setTimeout(() => setAnimationPhase(1), 600),
      setTimeout(() => setAnimationPhase(2), 1200),
      setTimeout(() => setAnimationPhase(3), 1800)
    ]
    
    // Random loading messages
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length)
      setLoadingMessage(loadingMessages[randomIndex])
    }, 1000)
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (100 / 50) // 50 steps over 5 seconds
        return newProgress > 100 ? 100 : newProgress
      })
    }, 100)
    
    // Set final message to "Preparing the lab..." before hiding
    const finalMessageTimer = setTimeout(() => {
      clearInterval(messageInterval) // Stop random messages
      setLoadingMessage("Preparing the lab...")
    }, 4000)
    
    // Hide splash screen after 5 seconds with a smooth transition
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    
    return () => {
      phaseTimers.forEach(timer => clearTimeout(timer))
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(finalMessageTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background gradient that matches the site's color scheme */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e6f7f0] to-[#d0f0e2]"></div>
          
          {/* Animated gradient orbs */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${animationPhase >= 1 ? 'opacity-70' : 'opacity-0'}`}>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#4ade80]/20 to-[#22c55e]/20 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#22c55e]/20 to-[#16a34a]/20 blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              className="inline-block"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            >
              <HeartPulse 
                size={80} 
                className={`text-[#16a34a] transition-opacity duration-700 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'}`} 
              />
            </motion.div>

            <motion.h2
              className={`mt-6 text-5xl font-bold bg-gradient-to-r from-[#16a34a] to-[#4ade80] bg-clip-text text-transparent transition-all duration-1000 ${
                animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              ParaDoc
            </motion.h2>
            
            <motion.p
              className={`mt-2 text-xl text-[#16a34a]/80 transition-all duration-1000 delay-300 ${
                animationPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Health Simulator
            </motion.p>

            {/* Loading message with animation */}
            <motion.p
              key={loadingMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-8 text-[#16a34a]/70 text-lg italic transition-all duration-300 ${
                animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {loadingMessage}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className={`mt-4 h-1.5 w-64 bg-white/50 rounded-full overflow-hidden mx-auto shadow-inner transition-all duration-1000 ${
                animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#16a34a] to-[#4ade80]"
                style={{ width: `${loadingProgress}%` }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </motion.div>
            
            <motion.p
              className={`mt-6 text-[#16a34a]/70 text-lg font-light transition-all duration-1000 delay-500 ${
                animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Revolutionizing health insights
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}