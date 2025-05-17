"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CircularProgressProps {
  value: number
  size: number
  strokeWidth: number
  color: string
  bgColor: string
  animate?: boolean
}

export default function CircularProgress({
  value,
  size,
  strokeWidth,
  color,
  bgColor,
  animate = true,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0)

  // Calculate circle properties with safety checks
  const radius = ((size || 100) - (strokeWidth || 10)) / 2
  const circumference = radius * 2 * Math.PI
  const safeProgress = isNaN(progress) ? 0 : Math.max(0, Math.min(100, progress))
  const strokeDashoffset = circumference - (safeProgress / 100) * circumference

  useEffect(() => {
    if (animate) {
      // Animate the progress from 0 to the actual value
      const timer = setTimeout(() => {
        setProgress(value)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setProgress(value)
    }
  }, [value, animate])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-lg font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ color }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  )
}
