"use client";

import PageTransition from "@/components/animations/page-transition";
import Header from "@/components/header";
import LoadingScreen from "@/components/loading-screen";
import SimulatedOutcomes from "@/components/simulated-outcomes";
import SymptomInput, { ResultData } from "@/components/symptom-input";
import ThemeToggle from "@/components/theme-toggle";
import FloatingActionButton from "@/components/ui-elements/floating-action-button";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Ear,
  ExternalLink,
  Heart,
  Lightbulb,
  Mic,
  Pill,
  Stethoscope,
  Thermometer,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Health tips that will rotate
const healthTips = [
  "Stay hydrated! Aim for 8 glasses of water daily.",
  "Take short breaks every 30 minutes when working at a computer.",
  "Regular exercise can boost your immune system and mood.",
  "Aim for 7-9 hours of quality sleep each night.",
  "Incorporate colorful fruits and vegetables into every meal.",
  "Practice deep breathing for 5 minutes daily to reduce stress.",
  "Limit screen time before bed for better sleep quality.",
  "Regular hand washing is one of the best ways to prevent illness.",
  "Schedule regular check-ups with your healthcare provider.",
  "Take time to stretch throughout the day to improve flexibility.",
];

// Health resources with links
const healthResources = [
  {
    title: "World Health Organization",
    description: "Official health information and guidelines",
    url: "https://www.who.int/",
    icon: <BookOpen size={18} />,
  },
  {
    title: "CDC Health Information",
    description: "Disease prevention and control resources",
    url: "https://www.cdc.gov/",
    icon: <BookOpen size={18} />,
  },
  {
    title: "Mayo Clinic",
    description: "Comprehensive medical information",
    url: "https://www.mayoclinic.org/",
    icon: <BookOpen size={18} />,
  },
  {
    title: "MedlinePlus",
    description: "Trusted health information for you",
    url: "https://medlineplus.gov/",
    icon: <BookOpen size={18} />,
  },
];

// Common symptom categories
const symptomCategories = [
  {
    name: "Neurological",
    icon: <Brain size={18} />,
    examples: "Headache, Dizziness, Confusion",
  },
  {
    name: "Cardiovascular",
    icon: <Activity size={18} />,
    examples: "Chest pain, Palpitations, Fatigue",
  },
  {
    name: "Respiratory",
    icon: <Stethoscope size={18} />,
    examples: "Cough, Shortness of breath, Wheezing",
  },
  {
    name: "Gastrointestinal",
    icon: <Activity size={18} />,
    examples: "Nausea, Vomiting, Abdominal pain",
  },
  {
    name: "Fever & Pain",
    icon: <Thermometer size={18} />,
    examples: "Fever, Body aches, Chills",
  },
  {
    name: "Skin & Allergies",
    icon: <Thermometer size={18} />,
    examples: "Rash, Itching, Swelling",
  },
  {
    name: "ENT Issues",
    icon: <Ear size={18} />,
    examples: "Sore throat, Ear pain, Sinus pressure",
  },
  {
    name: "Medication",
    icon: <Pill size={18} />,
    examples: "Side effects, Interactions, Dosage",
  },
];

// Emergency warning signs
const emergencyWarnings = [
  "Difficulty breathing or shortness of breath",
  "Persistent chest pain or pressure",
  "New confusion or inability to wake/stay awake",
  "Bluish lips or face",
  "Severe, persistent pain or pressure in the abdomen",
  "Sudden severe headache, especially with neurological symptoms",
];

// Import the Gemini API utility

export default function Home() {
  const router = useRouter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTip, setCurrentTip] = useState(healthTips[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Update the type of simulationResults state
  const [simulationResults, setSimulationResults] = useState<ResultData | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Rotate health tips every 8 seconds
    const tipInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * healthTips.length);
      setCurrentTip(healthTips[randomIndex]);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(tipInterval);
    };
  }, []);

 const handleSymptomSubmit = (symptom: string) => {
  // We're now handling the API call directly in the SymptomInput component
  // This function just provides a hook for potential future functionality or logging
  console.log("Symptom submitted:", symptom);
  
  // We'll need to add a way to get the simulation results from the SymptomInput component
  // This will be done by modifying the SymptomInput component to emit the results
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 overflow-hidden max-w-5xl mx-auto">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Existing decorative elements */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-100/30 dark:bg-pink-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-rose-100/40 dark:bg-rose-900/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-100/20 dark:bg-purple-900/10 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        ></motion.div>

        {/* New animated elements */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-56 h-56 rounded-full bg-blue-100/20 dark:bg-blue-900/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/5 w-48 h-48 rounded-full bg-indigo-100/20 dark:bg-indigo-900/10 blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        ></motion.div>

        <motion.div
          className="absolute top-2/3 right-1/3 w-32 h-32 rounded-full bg-amber-100/20 dark:bg-amber-900/10 blur-xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        ></motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-rose-300/40 dark:bg-rose-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Medical cross symbol that occasionally pulses */}
        <motion.div
          className="absolute top-[15%] right-[15%] w-16 h-16 opacity-10 dark:opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute top-1/2 left-0 right-0 h-3 bg-rose-400 dark:bg-rose-500 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-rose-400 dark:bg-rose-500 rounded-full transform -translate-x-1/2"></div>
          </div>
        </motion.div>
      </div>

      <Suspense fallback={<LoadingScreen />}>
        <PageTransition>
          <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Header />
            </motion.div>

            {/* Health Tip Banner */}
            <motion.div
              className="mt-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-300 dark:from-rose-500 dark:to-purple-500 rounded-lg blur-sm opacity-50"></div>
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-rose-100 dark:border-slate-700 flex items-center">
                <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-full mr-3">
                  <Heart
                    size={18}
                    className="text-rose-500 dark:text-rose-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-rose-600 dark:text-rose-300">
                    Daily Health Tip
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTip}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm text-gray-600 dark:text-gray-300"
                    >
                      {currentTip}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <main className="mt-8 space-y-8 ">
              {/* Symptom Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 20,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-rose-100 dark:border-slate-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-rose-500" />
                    Common Symptom Categories
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {symptomCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 border ${
                          selectedCategory === category.name
                            ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800/50 shadow-sm"
                            : "border-transparent hover:bg-rose-50/50 dark:hover:bg-slate-700/30 hover:border-rose-100 dark:hover:border-slate-600"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-full mb-2 ${
                            selectedCategory === category.name
                              ? "bg-rose-200 dark:bg-rose-800/30"
                              : "bg-rose-100/70 dark:bg-slate-700/50"
                          }`}
                        >
                          {category.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {category.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center line-clamp-1">
                          {category.examples}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  scale: isLoaded ? 1 : 0.95,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="relative"
              >
                {/* Decorative border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 dark:from-rose-600 dark:via-pink-500 dark:to-purple-600 rounded-2xl blur-sm opacity-70"></div>

                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-rose-100 dark:border-slate-700">
                  <Suspense
                    fallback={
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-500 rounded-full animate-spin"></div>
                          <p className="mt-4 text-rose-500 dark:text-rose-300 font-medium">
                            Preparing your consultation...
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <SymptomInput
                      selectedCategory={selectedCategory}
                      onSubmit={handleSymptomSubmit}
                      onSimulationResult={setSimulationResults}
                      isLoading={isSimulating}
                    />
                  </Suspense>
                </div>
              </motion.div>

              {/* Simulated Outcomes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 20,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <SimulatedOutcomes results={simulationResults} />
              </motion.div>

              {/* Emergency Warning Signs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 20,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="bg-red-50 dark:bg-red-900/20 backdrop-blur-sm rounded-xl shadow-md p-6 border border-red-100 dark:border-red-800/30">
                  <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Emergency Warning Signs
                  </h2>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-3">
                    Seek immediate medical attention if you experience any of
                    these symptoms:
                  </p>
                  <ul className="space-y-2">
                    {emergencyWarnings.map((warning, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2"></span>
                        <span className="text-sm text-red-600 dark:text-red-200">
                          {warning}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-800/30">
                    <p className="text-sm text-red-600 dark:text-red-300 font-medium">
                      In case of emergency, call your local emergency number
                      (101 in India) immediately.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Health Resources Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 20,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-rose-100 dark:border-slate-700">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-rose-500" />
                    Trusted Health Resources
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {healthResources.map((resource, index) => (
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="group flex items-center p-3 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-700/50 transition-colors duration-200 border border-transparent hover:border-rose-200 dark:hover:border-slate-600"
                      >
                        <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-full mr-3 group-hover:bg-rose-200 dark:group-hover:bg-rose-800/30 transition-colors duration-200">
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-800 dark:text-white flex items-center">
                            {resource.title}
                            <ExternalLink
                              size={12}
                              className="ml-1 opacity-70"
                            />
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {resource.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-rose-400 dark:text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-rose-100 dark:border-slate-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                      Disclaimer: The information provided is for general
                      informational purposes only and should not replace
                      professional medical advice.
                    </p>
                  </div>
                </div>
              </motion.div>
            </main>
            <div className="fixed top-6 right-6 z-50">
            <SignedOut>
              <Button 
                onClick={() => router.push("/sign-in")}
                className="bg-gradient-to-r from-rose-400 to-purple-400 dark:from-rose-500 dark:to-purple-500 text-white hover:from-rose-500 hover:to-purple-500 dark:hover:from-rose-600 dark:hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign In
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
          </div>
        </PageTransition>
      </Suspense>
    </div>
  );
}
