"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function BackgroundGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return

    // Set initial position to center of screen to avoid null values
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 bg-off-white dark:bg-slate-900 transition-colors duration-500 z-0" />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-medical-blue/5 to-transparent dark:from-blue-900/10 dark:to-transparent z-0 opacity-70 dark:opacity-40"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-mint-green/5 to-transparent dark:from-teal-900/10 dark:to-transparent z-0 opacity-70 dark:opacity-40"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <motion.div
        className="fixed w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-medical-blue/10 to-mint-green/10 dark:from-blue-900/10 dark:to-teal-900/10 blur-[120px] z-0"
        animate={{
          x: mousePosition.x ? mousePosition.x - 400 : 0,
          y: mousePosition.y ? mousePosition.y - 400 : 0,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
          mass: 3,
        }}
      />
    </>
  )
}
