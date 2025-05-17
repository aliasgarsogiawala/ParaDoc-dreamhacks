"use client"

import { motion } from "framer-motion"
import { HeartPulse } from "lucide-react"

export default function Header() {
  return (
    <motion.header
      className="text-center py-12 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center mb-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="relative"
        >
          <HeartPulse size={48} className="text-medical-blue dark:text-blue-300" />
          <motion.div
            className="absolute inset-0 bg-medical-blue/20 dark:bg-blue-500/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </div>

      <motion.h1
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-medical-blue to-mint-green bg-clip-text text-transparent dark:from-blue-300 dark:to-teal-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        ParaDoc
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mt-3 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        See what could happen before it does.
      </motion.p>
    </motion.header>
  )
}
