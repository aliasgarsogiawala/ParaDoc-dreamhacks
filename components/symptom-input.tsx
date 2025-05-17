"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, X, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const QUICK_SYMPTOMS = ["Mild pain", "Fatigue", "Fever", "Skipped medication", "No doctor visit yet"]

const EXAMPLE_PROMPTS = [
  "I've had a persistent headache for 3 days with some dizziness",
  "My throat is sore and I have a slight fever of 100°F",
  "I've been experiencing shortness of breath when climbing stairs",
  "I have a rash on my arm that appeared yesterday and is slightly itchy",
]

export default function SymptomInput() {
  const [symptoms, setSymptoms] = useState("")
  const [isSimulated, setIsSimulated] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleQuickSymptom = (symptom: string) => {
    setSymptoms((prev) => (prev ? `${prev}, ${symptom.toLowerCase()}` : symptom))
    textareaRef.current?.focus()
  }

  const handleSimulate = () => {
    if (symptoms.trim()) {
      setIsSimulated(true)
      // In a real app, this would trigger an API call to get simulation results
    }
  }

  const clearInput = () => {
    setSymptoms("")
    textareaRef.current?.focus()
  }

  const [examplePrompt, setExamplePrompt] = useState<string | null>(null)

  const useExamplePrompt = useCallback(() => {
    if (examplePrompt) {
      setSymptoms(examplePrompt)
      textareaRef.current?.focus()
    }
  }, [examplePrompt, setSymptoms])

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white">Describe Your Symptoms</h2>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <HelpCircle className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                <span className="sr-only">Help</span>
              </Button>
            </PopoverTrigger>
          </Popover>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <motion.div
              className={`absolute inset-0 border-2 rounded-lg pointer-events-none ${
                isFocused ? "border-medical-blue dark:border-blue-400" : "border-transparent"
              }`}
              animate={{
                boxShadow: isFocused ? "0 0 0 3px rgba(74, 155, 209, 0.25)" : "0 0 0 0px rgba(74, 155, 209, 0)",
              }}
              transition={{ duration: 0.2 }}
            />

            <div className="relative">
              <textarea
                ref={textareaRef}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Describe what you're currently feeling..."
                className="w-full p-5 border border-slate-200 dark:border-slate-700 rounded-lg h-40 focus:outline-none dark:bg-slate-700/70 dark:text-white transition-all resize-none text-lg"
              />

              <AnimatePresence>
                {symptoms && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    onClick={clearInput}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 left-4 flex items-center text-slate-400 dark:text-slate-500">
                <Search size={18} />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
              <span className="px-3 text-xs text-slate-500 dark:text-slate-400 font-medium">QUICK SELECT</span>
              <div className="h-px flex-grow bg-slate-200 dark:bg-slate-700"></div>
            </div>

            <motion.div
              className="flex flex-wrap gap-2"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {QUICK_SYMPTOMS.map((symptom, index) => (
                <motion.button
                  key={symptom}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 },
                  }}
                  onClick={() => handleQuickSymptom(symptom)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-medical-blue/10 dark:bg-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {symptom}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleSimulate}
                className="bg-gradient-to-r from-medical-blue to-mint-green hover:from-medical-blue/90 hover:to-mint-green/90 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all shadow-lg hover:shadow-xl"
                disabled={!symptoms.trim()}
              >
                <motion.span
                  animate={{
                    scale: symptoms.trim() ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                >
                  Simulate Outcomes
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <Popover>
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-800 dark:text-white">Example Descriptions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Not sure how to describe your symptoms? Try one of these examples:
            </p>
            <div className="space-y-2">
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setExamplePrompt(prompt)
                    useExamplePrompt()
                  }}
                  className="text-left w-full p-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  whileHover={{ x: 3 }}
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <motion.div
                className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Scroll for more</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.section>
  )
}
