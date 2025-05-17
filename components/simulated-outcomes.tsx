"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { AlertTriangle, CheckCircle, Activity, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CircularProgress from "@/components/ui-elements/circular-progress"

type Path = {
  id: string
  title: string
  description: string
  days: { day: number; event: string }[]
  riskScore: number
  recoveryChance: number
  tag: { text: string; icon: React.ReactNode; color: string; bgColor: string }
}

export default function SimulatedOutcomes() {
  const [activeTab, setActiveTab] = useState("path-b")
  const [currentDay, setCurrentDay] = useState(1)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // In a real app, this would come from an API based on the symptoms
  const paths: Path[] = [
    {
      id: "path-a",
      title: "Doing Nothing",
      description:
        "By Day 5, the user experiences worsening symptoms due to untreated infection, leading to potential complications and longer recovery time.",
      days: [
        { day: 1, event: "Mild symptoms continue" },
        { day: 2, event: "Slight increase in discomfort" },
        { day: 3, event: "Symptoms worsen, affecting daily activities" },
        { day: 5, event: "Significant pain, possible infection spread" },
        { day: 7, event: "May require emergency intervention" },
      ],
      riskScore: 75,
      recoveryChance: 45,
      tag: {
        text: "High Risk",
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-red-600 dark:text-red-400",
        bgColor: "bg-red-100 dark:bg-red-900/30",
      },
    },
    {
      id: "path-b",
      title: "Seeking Medical Attention",
      description:
        "Early diagnosis leads to appropriate treatment, preventing complications and ensuring faster recovery with minimal disruption to daily life.",
      days: [
        { day: 1, event: "Doctor visit and diagnosis" },
        { day: 2, event: "Begin prescribed treatment" },
        { day: 3, event: "Initial improvement in symptoms" },
        { day: 5, event: "Significant reduction in symptoms" },
        { day: 7, event: "Nearly complete recovery" },
      ],
      riskScore: 15,
      recoveryChance: 95,
      tag: {
        text: "Best Path",
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/30",
      },
    },
    {
      id: "path-c",
      title: "Self-Treatment",
      description:
        "Self-medication provides temporary relief but may mask underlying issues, potentially leading to delayed proper treatment.",
      days: [
        { day: 1, event: "Begin over-the-counter remedies" },
        { day: 2, event: "Temporary symptom relief" },
        { day: 3, event: "Symptoms return or plateau" },
        { day: 5, event: "Possible need for medical intervention" },
        { day: 7, event: "Longer recovery timeline" },
      ],
      riskScore: 45,
      recoveryChance: 65,
      tag: {
        text: "Moderate Risk",
        icon: <Activity className="h-4 w-4" />,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      },
    },
  ]

  // Auto-advance days for demo purposes, but limit to prevent performance issues
  useEffect(() => {
    if (!isInView) return

    // Limit the number of animations to prevent performance issues
    let count = 0
    const maxCycles = 3

    const timer = setInterval(() => {
      setCurrentDay((prev) => {
        const newDay = prev >= 7 ? 1 : prev + 1

        // Increment count when we complete a cycle
        if (newDay === 1) {
          count++
        }

        // Clear interval after maxCycles
        if (count >= maxCycles) {
          clearInterval(timer)
        }

        return newDay
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [isInView])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      ref={containerRef}
      className="space-y-8"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={container}
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white">Simulated Outcomes</h2>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full flex items-center">
            <span className="text-sm font-medium">Day {currentDay}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDay((prev) => Math.min(7, prev + 1))}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Tabs defaultValue="path-b" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {paths.map((path) => (
              <TabsTrigger
                key={path.id}
                value={path.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-medical-blue/10 data-[state=active]:to-mint-green/10 data-[state=active]:text-medical-blue dark:data-[state=active]:text-blue-300 relative py-3"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-medical-blue to-mint-green"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeTab === path.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {path.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative">
            {paths.map((path) => (
              <TabsContent key={path.id} value={path.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700/50"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                      <div className="md:w-1/3 space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                              Path {path.id.split("-")[1].toUpperCase()}: {path.title}
                            </h3>

                            <Badge
                              variant="outline"
                              className={`${path.tag.bgColor} ${path.tag.color} flex items-center gap-1.5 px-2.5 py-1`}
                            >
                              {path.tag.icon}
                              {path.tag.text}
                            </Badge>
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 mb-6">{path.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Risk Score</span>
                              <span
                                className={`text-sm font-bold ${
                                  path.riskScore > 60
                                    ? "text-red-500"
                                    : path.riskScore > 30
                                      ? "text-yellow-500"
                                      : "text-green-500"
                                }`}
                              >
                                {path.riskScore}%
                              </span>
                            </div>
                            <CircularProgress
                              value={path.riskScore}
                              size={100}
                              strokeWidth={10}
                              color={path.riskScore > 60 ? "#ef4444" : path.riskScore > 30 ? "#eab308" : "#22c55e"}
                              bgColor="rgba(0,0,0,0.1)"
                              animate={isInView}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Recovery</span>
                              <span
                                className={`text-sm font-bold ${
                                  path.recoveryChance > 70
                                    ? "text-green-500"
                                    : path.recoveryChance > 40
                                      ? "text-yellow-500"
                                      : "text-red-500"
                                }`}
                              >
                                {path.recoveryChance}%
                              </span>
                            </div>
                            <CircularProgress
                              value={path.recoveryChance}
                              size={100}
                              strokeWidth={10}
                              color={
                                path.recoveryChance > 70 ? "#22c55e" : path.recoveryChance > 40 ? "#eab308" : "#ef4444"
                              }
                              bgColor="rgba(0,0,0,0.1)"
                              animate={isInView}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-6 md:pt-0 md:pl-10">
                        <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-6">
                          Timeline Progression
                        </h4>

                        <div className="relative">
                          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-slate-200 dark:bg-slate-700" />

                          <div className="space-y-8">
                            {path.days.map((day) => {
                              const isCurrentDay = day.day === currentDay
                              const isPastDay = day.day < currentDay

                              return (
                                <div key={day.day} className="relative pl-12">
                                  <motion.div
                                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                      isCurrentDay
                                        ? "bg-medical-blue text-white"
                                        : isPastDay
                                          ? "bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200"
                                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                    }`}
                                    animate={
                                      isCurrentDay
                                        ? {
                                            scale: [1, 1.1, 1],
                                            boxShadow: [
                                              "0 0 0 0 rgba(74, 155, 209, 0)",
                                              "0 0 0 8px rgba(74, 155, 209, 0.2)",
                                              "0 0 0 0 rgba(74, 155, 209, 0)",
                                            ],
                                          }
                                        : {}
                                    }
                                    transition={{
                                      duration: 2,
                                      repeat: isCurrentDay ? Number.POSITIVE_INFINITY : 0,
                                      repeatDelay: 1,
                                    }}
                                  >
                                    {day.day}
                                  </motion.div>

                                  <div>
                                    <motion.div
                                      className={`text-base ${
                                        isCurrentDay
                                          ? "font-semibold text-medical-blue dark:text-blue-300"
                                          : "text-slate-700 dark:text-slate-200"
                                      }`}
                                      animate={
                                        isCurrentDay
                                          ? {
                                              x: [0, 3, 0],
                                            }
                                          : {}
                                      }
                                      transition={{
                                        duration: 0.5,
                                        delay: 0.2,
                                      }}
                                    >
                                      Day {day.day}
                                    </motion.div>

                                    <motion.p
                                      className="mt-1 text-slate-600 dark:text-slate-300"
                                      animate={
                                        isCurrentDay
                                          ? {
                                              opacity: [0.7, 1, 0.7],
                                            }
                                          : {}
                                      }
                                      transition={{
                                        duration: 2,
                                        repeat: isCurrentDay ? Number.POSITIVE_INFINITY : 0,
                                        repeatDelay: 1,
                                      }}
                                    >
                                      {day.event}
                                    </motion.p>

                                    {isCurrentDay && (
                                      <motion.div
                                        className="h-0.5 bg-medical-blue dark:bg-blue-400 mt-2"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                      />
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </motion.div>
    </motion.section>
  )
}
