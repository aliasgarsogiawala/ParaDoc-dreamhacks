"use client"

import { motion } from "framer-motion"
import { HeartPulse } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-off-white dark:bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
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
          <HeartPulse size={60} className="text-medical-blue dark:text-blue-300" />
        </motion.div>

        <motion.h2
          className="mt-6 text-2xl font-bold text-medical-blue dark:text-blue-300"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          Loading ParaDoc
        </motion.h2>

        <motion.div
          className="mt-8 h-1 w-48 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-medical-blue to-mint-green"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
