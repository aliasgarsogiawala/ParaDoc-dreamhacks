"use client";

import type React from "react";

import CircularProgress from "@/components/ui-elements/circular-progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Path = {
  id: string;
  title: string;
  description: string;
  days: { day: number; event: string }[];
  riskScore: number;
  recoveryChance: number;
  tag: { text: string; icon: React.ReactNode; color: string; bgColor: string };
};

export default function SimulatedOutcomes() {
  const [activeTab, setActiveTab] = useState("path-b");
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

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
        { day: 4, event: "Pain intensifies, sleep becomes difficult" },
        { day: 5, event: "Significant pain, possible infection spread" },
        { day: 6, event: "Severe symptoms, mobility severely limited" },
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
        { day: 4, event: "Continued improvement, reduced discomfort" },
        { day: 5, event: "Significant reduction in symptoms" },
        { day: 6, event: "Almost back to normal activities" },
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
        { day: 4, event: "Trying different remedies with mixed results" },
        { day: 5, event: "Possible need for medical intervention" },
        { day: 6, event: "Gradual improvement with proper care" },
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
  ];

  // Auto-advance days for demo purposes, but limit to prevent performance issues
  useEffect(() => {
    if (!isInView) return;

    // Limit the number of animations to prevent performance issues
    let count = 0;
    const maxCycles = 3;

    const timer = setInterval(() => {
      setCurrentDay((prev) => {
        const newDay = prev >= 7 ? 1 : prev + 1;

        // Increment count when we complete a cycle
        if (newDay === 1) {
          count++;
        }

        // Clear interval after maxCycles
        if (count >= maxCycles) {
          clearInterval(timer);
        }

        return newDay;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isInView]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={containerRef}
      className="space-y-8"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={container}
    >
      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-blue to-mint-green flex items-center justify-center mr-3"
          >
            <Activity className="h-5 w-5 text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-medical-blue to-mint-green bg-clip-text text-transparent">
            Simulated Outcomes
          </h2>
        </div>

        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-full shadow-sm">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
            className="rounded-full h-9 w-9 transition-all duration-200 hover:bg-medical-blue/10 hover:text-medical-blue dark:hover:bg-medical-blue/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <motion.div
            className="bg-white dark:bg-slate-700 px-4 py-1.5 rounded-full flex items-center shadow-sm"
            animate={{
              scale: [1, 1.05, 1],
              backgroundColor:
                currentDay > 5 ? ["#ffffff", "#fff0f0", "#ffffff"] : undefined,
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <span className="text-sm font-medium">Day {currentDay}</span>
            {currentDay > 5 && (
              <span className="ml-1.5 text-xs px-1.5 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
                Critical
              </span>
            )}
          </motion.div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDay((prev) => Math.min(7, prev + 1))}
            className="rounded-full h-9 w-9 transition-all duration-200 hover:bg-medical-blue/10 hover:text-medical-blue dark:hover:bg-medical-blue/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs
          defaultValue="path-b"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-8 p-1 bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl">
            {paths.map((path) => (
              <TabsTrigger
                key={path.id}
                value={path.id}
                className="relative py-1 px-2 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-medical-blue/10 data-[state=active]:to-mint-green/10 data-[state=active]:text-medical-blue dark:data-[state=active]:text-blue-300 data-[state=active]:font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 group rounded-lg"
              >
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-medical-blue to-mint-green rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: activeTab === path.id ? 1 : 0,
                    opacity: activeTab === path.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <motion.div
                    className={`flex items-center justify-center rounded-full p-1.5 ${
                      path.id === "path-a"
                        ? "bg-red-100 dark:bg-red-900/30"
                        : path.id === "path-b"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-yellow-100 dark:bg-yellow-900/30"
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: activeTab === path.id ? 1 : 0.8,
                      rotate: activeTab === path.id ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      rotate: { duration: 0.3, delay: 0.2 },
                    }}
                  >
                    {path.id === "path-a" && (
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500 dark:text-red-400" />
                    )}
                    {path.id === "path-b" && (
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                    )}
                    {path.id === "path-c" && (
                      <Activity className="h-3.5 w-3.5 text-yellow-500 dark:text-yellow-400" />
                    )}
                  </motion.div>
                  <span className="font-medium">{path.title}</span>
                </div>
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
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center">
                              <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-r from-medical-blue to-mint-green text-white text-xs flex items-center justify-center mr-2">
                                {path.id.split("-")[1].toUpperCase()}
                              </span>
                              {path.title}
                            </h3>

                            <Badge
                              variant="outline"
                              className={`${path.tag.bgColor} ${path.tag.color} flex items-center gap-1.5 px-2.5 py-1 shadow-sm`}
                            >
                              {path.tag.icon}
                              {path.tag.text}
                            </Badge>
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                            {path.description}
                          </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                          <motion.div
                            className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Risk Score
                              </span>
                              <motion.span
                                className={`text-sm font-bold ${
                                  path.riskScore > 60
                                    ? "text-red-500"
                                    : path.riskScore > 30
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                              >
                                {path.riskScore}%
                              </motion.span>
                            </div>
                            <div className="flex items-center justify-center">
                              <CircularProgress
                                value={path.riskScore}
                                size={100}
                                strokeWidth={10}
                                color={
                                  path.riskScore > 60
                                    ? "#ef4444"
                                    : path.riskScore > 30
                                    ? "#eab308"
                                    : "#22c55e"
                                }
                                bgColor="rgba(0,0,0,0.1)"
                                animate={isInView}
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Recovery
                              </span>
                              <motion.span
                                className={`text-sm font-bold ${
                                  path.recoveryChance > 70
                                    ? "text-green-500"
                                    : path.recoveryChance > 40
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                              >
                                {path.recoveryChance}%
                              </motion.span>
                            </div>
                            <div className="flex items-center justify-center">
                              <CircularProgress
                                value={path.recoveryChance}
                                size={100}
                                strokeWidth={10}
                                color={
                                  path.recoveryChance > 70
                                    ? "#22c55e"
                                    : path.recoveryChance > 40
                                    ? "#eab308"
                                    : "#ef4444"
                                }
                                bgColor="rgba(0,0,0,0.1)"
                                animate={isInView}
                              />
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <motion.div
                        className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 pt-6 md:pt-0 md:pl-10"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <h4 className="text-lg font-medium text-slate-800 dark:text-white mb-6 flex items-center">
                          <motion.div
                            className="w-6 h-6 rounded-full bg-medical-blue/20 flex items-center justify-center mr-2"
                            animate={{
                              scale: [1, 1.1, 1],
                              backgroundColor: [
                                "rgba(74, 155, 209, 0.2)",
                                "rgba(74, 155, 209, 0.3)",
                                "rgba(74, 155, 209, 0.2)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <span className="w-2 h-2 rounded-full bg-medical-blue"></span>
                          </motion.div>
                          Timeline Progression
                        </h4>

                        <div className="relative">
                          <motion.div
                            className="absolute top-0 bottom-0 left-4 w-0.5 bg-slate-200 dark:bg-slate-700"
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                          />

                          <div className="space-y-8">
                            {path.days.map((day, index) => {
                              const isCurrentDay = day.day === currentDay;
                              const isPastDay = day.day < currentDay;
                              const isSelected = selectedDay === day.day;

                              return (
                                <motion.div
                                  key={day.day}
                                  className="relative pl-12"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    delay: 0.2 + index * 0.1,
                                  }}
                                >
                                  <motion.div
                                    className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer ${
                                      isSelected
                                        ? "bg-mint-green text-white"
                                        : isCurrentDay
                                        ? "bg-medical-blue text-white"
                                        : isPastDay
                                        ? "bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-200"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                    }`}
                                    onClick={() => setSelectedDay(isSelected ? null : day.day)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={
                                      isSelected
                                        ? {
                                            scale: [1, 1.1, 1],
                                            boxShadow: [
                                              "0 0 0 0 rgba(74, 222, 128, 0)",
                                              "0 0 0 8px rgba(74, 222, 128, 0.2)",
                                              "0 0 0 0 rgba(74, 222, 128, 0)",
                                            ],
                                          }
                                        : isCurrentDay
                                        ? {
                                            scale: [1, 1.1, 1],
                                            boxShadow: [
                                              "0 0 0 0 rgba(74, 155, 209, 0)",
                                              "0 0 0 8px rgba(74, 155, 209, 0.2)",
                                              "0 0 0 0 rgba(74, 155, 209, 0)",
                                            ],
                                          }
                                        : isPastDay
                                        ? { scale: 1, opacity: 0.8 }
                                        : { scale: 0.95, opacity: 0.6 }
                                    }
                                    transition={{
                                      duration: 2,
                                      repeat: (isSelected || isCurrentDay)
                                        ? Number.POSITIVE_INFINITY
                                        : 0,
                                      repeatDelay: 1,
                                    }}
                                  >
                                    {day.day}
                                  </motion.div>

                                  <div
                                    className={`${
                                      isSelected
                                        ? "bg-mint-green/5 dark:bg-mint-green/10 p-3 rounded-lg border-l-2 border-mint-green"
                                        : isCurrentDay
                                        ? "bg-medical-blue/5 dark:bg-medical-blue/10 p-3 rounded-lg"
                                        : ""
                                    }`}
                                  >
                                    <motion.div
                                      className={`text-base ${
                                        isSelected
                                          ? "font-semibold text-mint-green dark:text-green-300"
                                          : isCurrentDay
                                          ? "font-semibold text-medical-blue dark:text-blue-300"
                                          : isPastDay
                                          ? "font-medium text-slate-700 dark:text-slate-200"
                                          : "text-slate-500 dark:text-slate-400"
                                      }`}
                                      animate={
                                        isSelected || isCurrentDay
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
                                      className={`mt-1 ${
                                        isSelected
                                          ? "text-slate-800 dark:text-slate-100"
                                          : isCurrentDay 
                                          ? "text-slate-700 dark:text-slate-200" 
                                          : isPastDay
                                          ? "text-slate-600 dark:text-slate-300"
                                          : "text-slate-500 dark:text-slate-400"
                                      }`}
                                      animate={
                                        isSelected || isCurrentDay
                                          ? {
                                              opacity: [0.7, 1, 0.7],
                                            }
                                          : {}
                                      }
                                      transition={{
                                        duration: 2,
                                        repeat: (isSelected || isCurrentDay) 
                                          ? Number.POSITIVE_INFINITY 
                                          : 0,
                                        repeatDelay: 1,
                                      }}
                                    >
                                      {day.event}
                                    </motion.p>

                                    {(isSelected || isCurrentDay) && (
                                      <motion.div
                                        className={`h-0.5 ${
                                          isSelected 
                                            ? "bg-gradient-to-r from-mint-green to-green-400 dark:from-green-400 dark:to-teal-300" 
                                            : "bg-gradient-to-r from-medical-blue to-mint-green dark:from-blue-400 dark:to-teal-400"
                                        } mt-2 rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                      />
                                    )}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </motion.div>
    </motion.section>
  );
}
