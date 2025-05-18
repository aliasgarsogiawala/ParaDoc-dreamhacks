"use client";

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
import type React from "react";
import { useEffect, useRef, useState } from "react";

// Define types that match the result.json structure
interface TimelineDay {
  day: number;
  description: string;
}

interface Timeline {
  path: string;
  action: string;
  days: TimelineDay[];
  riskPercentage: number;
  recoveryPercentage: number;
}

interface ResultData {
  timelines: Timeline[];
  bestPath: {
    pathIndex: number;
    explanation: string;
  };
  disclaimer: string;
}

// Define the Path type used in the component
type Path = {
  id: string;
  title: string;
  description: string;
  days: { day: number; event: string }[];
  riskScore: number;
  recoveryChance: number;
  tag: { text: string; icon: React.ReactNode; color: string; bgColor: string };
};

// Define props for the component
interface SimulatedOutcomesProps {
  results?: ResultData | null;
}

export default function SimulatedOutcomes({ results }: SimulatedOutcomesProps) {
  const [activeTab, setActiveTab] = useState("path-0");
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  // Convert API results to the format expected by the component
  const convertResultsToPaths = (results: ResultData | null): Path[] => {
    if (!results || !results.timelines || !Array.isArray(results.timelines)) {
      // Return default paths if no results
      return defaultPaths;
    }

    return results.timelines.map((timeline, index) => {
      // Determine tag based on risk percentage
      let tag = {
        text: "Moderate Risk",
        icon: <Activity className="h-4 w-4" />,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      };

      if (timeline.riskPercentage > 60) {
        tag = {
          text: "High Risk",
          icon: <AlertTriangle className="h-4 w-4" />,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-100 dark:bg-red-900/30",
        };
      } else if (timeline.riskPercentage < 30) {
        tag = {
          text: "Best Path",
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
        };
      }

      // If this is the best path according to the API, override the tag
      if (results.bestPath && results.bestPath.pathIndex === index) {
        tag = {
          text: "Best Path",
          icon: <CheckCircle className="h-4 w-4" />,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/30",
        };
      }

      return {
        id: `path-${index}`,
        title: timeline.path,
        description: timeline.action,
        days: timeline.days.map((day) => ({
          day: day.day,
          event: day.description,
        })),
        riskScore: timeline.riskPercentage,
        recoveryChance: timeline.recoveryPercentage,
        tag,
      };
    });
  };

  // Default paths to use when no results are provided
  const defaultPaths: Path[] = [
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
    // ... existing code ...
  ];

  // Use the converted paths or default paths
  const paths = results ? convertResultsToPaths(results) : [];

  // Check if we have any paths to display
  const hasData = paths.length > 0;

  // Set the active tab to the best path if results are provided
  useEffect(() => {
    if (results && results.bestPath !== undefined) {
      setActiveTab(`path-${results.bestPath.pathIndex}`);
    }
  }, [results]);

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
            className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-blue to-mint-green flex items-center justify-center mr-3 shadow-md"
          >
            <Activity className="h-5 w-5 text-white" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-medical-blue to-mint-green bg-clip-text text-transparent">
            Simulated Outcomes
          </h2>
        </div>

        {hasData && (
          <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-full shadow-sm backdrop-blur-sm">
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
                  currentDay > 5
                    ? ["#ffffff", "#fff0f0", "#ffffff"]
                    : undefined,
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
        )}
      </motion.div>

      {!hasData ? (
        <motion.div
          variants={item}
          className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-700/50 p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center py-10">
            <motion.div
              className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-6"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Activity className="h-10 w-10 text-slate-400 dark:text-slate-500" />
            </motion.div>

            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
              No Simulations Available
            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-6">
              Describe your symptoms in the consultation box above, and I'll
              analyze possible outcomes and treatment paths.
            </p>

            <div className="flex items-center justify-center space-x-2 text-sm text-slate-400 dark:text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse"></span>
              <span>Waiting for your symptom description</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={item}
          className="relative flex flex-col space-y-8 md:space-y-0 md:flex-row-reverse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs
            defaultValue={paths.length > 0 ? paths[0].id : "path-0"}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full "
          >
            <TabsList className="grid grid-cols-3  gap-1 mb-8  bg-slate-100/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-sm">
              {paths.map((path) => (
                <TabsTrigger
                  key={path.id}
                  value={path.id}
                  className="flex-1 min-w-[120px] relative px-3 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-medical-blue/10 data-[state=active]:to-mint-green/10 data-[state=active]:text-medical-blue dark:data-[state=active]:text-blue-300 data-[state=active]:font-medium hover:bg-slate-100/80 dark:hover:bg-slate-800/80 group rounded-lg flex justify-center items-center"
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
                      className={`flex items-center justify-center rounded-full ${path.tag.bgColor} shadow-sm p-1.5`}
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
                      {path.tag.icon}
                    </motion.div>
                    <span className="font-medium items-center flex justify-center text-sm truncate max-w-[80px] sm:max-w-none">
                      {path.title}
                    </span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative mt-14">
              {paths.map((path) => (
                <TabsContent
                  key={path.id}
                  value={path.id}
                  className="mt-0"
                >
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
                                {path.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className={`${path.tag.bgColor} ${path.tag.color} flex justify-center items-center rounded-full gap-1.5 px-2.5 text-[0.7rem] py-1.5 shadow-sm`}
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
                              className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.3 }}
                              whileHover={{ y: -2 }}
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
                              className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.4 }}
                              whileHover={{ y: -2 }}
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
                              className="w-6 h-6 rounded-full bg-medical-blue/20 flex items-center justify-center mr-2 shadow-sm"
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
                              className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-medical-blue/30 to-mint-green/30 dark:from-medical-blue/50 dark:to-mint-green/50"
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
                                    whileHover={{ x: 3 }}
                                  >
                                    <motion.div
                                      className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                                        isCurrentDay
                                          ? "bg-medical-blue text-white shadow-md shadow-medical-blue/30"
                                          : isPastDay
                                          ? "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                                          : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700"
                                      } ${
                                        isSelected
                                          ? "ring-2 ring-medical-blue/50 dark:ring-medical-blue/70"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        setSelectedDay(
                                          selectedDay === day.day
                                            ? null
                                            : day.day
                                        )
                                      }
                                      whileHover={{
                                        scale: 1.1,
                                        boxShadow:
                                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                      }}
                                      animate={{
                                        scale: isCurrentDay ? [1, 1.1, 1] : 1,
                                        transition: {
                                          duration: isCurrentDay ? 1.5 : 0.2,
                                          repeat: isCurrentDay
                                            ? Infinity
                                            : undefined,
                                          repeatDelay: 2,
                                        },
                                      }}
                                    >
                                      <span className="text-sm font-medium">
                                        {day.day}
                                      </span>
                                    </motion.div>

                                    <div
                                      className={`bg-white dark:bg-slate-800/90 p-4 rounded-lg shadow-sm border ${
                                        isCurrentDay
                                          ? "border-medical-blue/30 dark:border-medical-blue/50 shadow-md"
                                          : "border-slate-100 dark:border-slate-700/50"
                                      } ${
                                        isSelected
                                          ? "ring-2 ring-medical-blue/30 dark:ring-medical-blue/50"
                                          : ""
                                      } transition-all duration-300 hover:shadow-md`}
                                    >
                                      <div className="flex items-start justify-between">
                                        <h5
                                          className={`text-sm font-medium ${
                                            isCurrentDay
                                              ? "text-medical-blue dark:text-blue-300"
                                              : "text-slate-700 dark:text-slate-200"
                                          }`}
                                        >
                                          Day {day.day}
                                        </h5>
                                        {isCurrentDay && (
                                          <span className="px-2 py-0.5 bg-medical-blue/10 dark:bg-medical-blue/20 text-medical-blue dark:text-blue-300 text-xs rounded-full">
                                            Current
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
                                        {day.event}
                                      </p>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Add recommendation footer if needed */}
                    {results?.bestPath &&
                      results.bestPath.pathIndex ===
                        parseInt(path.id.split("-")[1]) && (
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 border-t border-green-100 dark:border-green-800/30">
                          <div className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-800/30 p-2 rounded-full mr-3">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h5 className="font-medium text-green-700 dark:text-green-400">
                                Recommended Approach
                              </h5>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                {results.bestPath.explanation ||
                                  "This approach offers the best balance of risk and recovery potential."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </motion.div>
      )}
    </motion.section>
  );
}
