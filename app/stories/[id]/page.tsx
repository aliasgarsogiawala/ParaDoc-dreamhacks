"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { StoryProgress } from "@/components/story-progress"
import { StoryChoice } from "@/components/story-choice"
import { InsightCard } from "@/components/insight-card"

// Mock story data - in a real app, this would come from an API or AI generation
const storyData = {
  "fever-dilemma": {
    title: "The Fever Dilemma",
    initialScene: {
      id: "start",
      content:
        "It's 2 AM and your 4-year-old child wakes up crying. When you check on them, you notice they feel very warm to the touch. You don't have a thermometer, but they're clearly feverish. The nearest hospital is 30 miles away, and you don't have a car. What do you do?",
      choices: [
        { id: "wait", text: "Wait until morning to see if the fever subsides", nextScene: "wait_morning" },
        { id: "neighbor", text: "Wake up a neighbor to ask for help", nextScene: "neighbor_help" },
        { id: "home_remedy", text: "Try a home remedy you remember from your childhood", nextScene: "home_remedy" },
        { id: "call_telehealth", text: "Call a 24/7 telehealth service", nextScene: "telehealth" },
      ],
    },
    scenes: {
      wait_morning: {
        content:
          "You decide to wait until morning. You give your child some water and try to make them comfortable. By 5 AM, their fever seems to have gotten worse, and they're now lethargic and not responding as quickly as usual.",
        choices: [
          { id: "emergency", text: "Call emergency services immediately", nextScene: "emergency_services" },
          { id: "neighbor_late", text: "Now wake up a neighbor for help", nextScene: "neighbor_help" },
          { id: "continue_wait", text: "Continue to wait until regular clinic hours", nextScene: "condition_worsens" },
        ],
      },
      neighbor_help: {
        content:
          "You decide to wake up your neighbor. They're initially annoyed but become concerned when you explain the situation. They offer to drive you to the hospital.",
        choices: [
          { id: "accept_ride", text: "Accept the ride and go immediately", nextScene: "hospital_early" },
          { id: "call_first", text: "Call the hospital first for advice", nextScene: "hospital_advice" },
        ],
      },
      home_remedy: {
        content:
          "You remember your mother used to use a cool cloth on the forehead and lukewarm baths to bring down fevers. You try these methods, but you're unsure if they're helping enough.",
        choices: [
          { id: "continue_remedy", text: "Continue with home remedies", nextScene: "remedy_results" },
          { id: "seek_help", text: "Decide to seek professional help after all", nextScene: "neighbor_help" },
        ],
      },
      telehealth: {
        content:
          "You call a telehealth service. After describing the symptoms, the nurse advises that your child needs to be seen by a doctor within the next few hours, especially if they're showing signs of lethargy or confusion.",
        choices: [
          {
            id: "follow_advice",
            text: "Follow their advice and find a way to the hospital",
            nextScene: "neighbor_help",
          },
          {
            id: "ask_alternatives",
            text: "Ask if there are any alternatives to going to the hospital",
            nextScene: "telehealth_alternatives",
          },
        ],
      },
      emergency_services: {
        content:
          "You call emergency services. They dispatch an ambulance which arrives in 20 minutes. The paramedics assess your child and determine they have a dangerously high fever that requires immediate medical attention.",
        choices: [{ id: "go_ambulance", text: "Go with them in the ambulance", nextScene: "hospital_emergency" }],
      },
      condition_worsens: {
        content:
          "As you continue to wait, your child's condition deteriorates. They become very lethargic and their breathing becomes rapid. You realize this is an emergency situation.",
        choices: [{ id: "late_emergency", text: "Call emergency services now", nextScene: "emergency_services" }],
      },
      hospital_early: {
        content:
          "You arrive at the hospital where doctors quickly diagnose your child with a severe ear infection that has caused the high fever. Because you sought help relatively quickly, they're able to start treatment right away.",
        choices: [{ id: "treatment", text: "Follow the treatment plan", nextScene: "recovery" }],
      },
      hospital_advice: {
        content:
          "The hospital advises you to bring your child in right away based on the symptoms you describe. Your neighbor drives you to the hospital.",
        choices: [{ id: "go_hospital", text: "Go to the hospital", nextScene: "hospital_early" }],
      },
      remedy_results: {
        content:
          "The home remedies seem to provide temporary relief, but by morning, the fever returns with greater intensity. Your child now also has a rash developing.",
        choices: [{ id: "now_hospital", text: "Now definitely go to the hospital", nextScene: "hospital_delayed" }],
      },
      telehealth_alternatives: {
        content:
          "The telehealth nurse explains there are no safe alternatives in this situation. Your child needs medical evaluation, and delaying could lead to complications from what might be a serious infection.",
        choices: [
          { id: "understand", text: "Understand the urgency and find transportation", nextScene: "neighbor_help" },
        ],
      },
      hospital_emergency: {
        content:
          "At the hospital, doctors determine your child has a severe case of pneumonia that has caused the high fever. They immediately start IV antibiotics and supportive care.",
        choices: [{ id: "hospital_stay", text: "Stay with your child at the hospital", nextScene: "serious_recovery" }],
      },
      hospital_delayed: {
        content:
          "At the hospital, doctors diagnose your child with a strep infection that has spread and caused complications. They explain that earlier treatment would have been preferable, but they start aggressive treatment immediately.",
        choices: [
          { id: "delayed_treatment", text: "Follow the extended treatment plan", nextScene: "longer_recovery" },
        ],
      },
      recovery: {
        content:
          "After following the treatment plan, your child recovers well within a few days. The doctor commends you for seeking help promptly, which prevented potential complications.",
        choices: [{ id: "end", text: "Complete the story", nextScene: "end" }],
      },
      serious_recovery: {
        content:
          "Your child requires three days in the hospital but eventually makes a full recovery. The doctors explain that the situation was serious and could have been life-threatening if you had waited much longer.",
        choices: [{ id: "end", text: "Complete the story", nextScene: "end" }],
      },
      longer_recovery: {
        content:
          "Your child requires a longer course of antibiotics and takes more time to fully recover. The doctor explains that in the future, high fevers in young children should be evaluated promptly to prevent similar situations.",
        choices: [{ id: "end", text: "Complete the story", nextScene: "end" }],
      },
      end: {
        content:
          "You've completed this health scenario. Based on your choices, we've prepared some insights about your decision-making patterns and health knowledge.",
        choices: [],
      },
    },
    insights: {
      wait: {
        pattern: "Delayed Action",
        insight:
          "You showed a tendency to wait before seeking medical help. For young children, high fevers can be dangerous and often require prompt medical attention.",
        recommendation:
          "Consider creating an emergency plan for health situations, especially if you have children or live in an area with limited healthcare access.",
      },
      neighbor: {
        pattern: "Help-Seeking",
        insight:
          "You were willing to ask for help in an emergency, which is a positive health behavior that can lead to better outcomes.",
        recommendation:
          "Consider building a support network of neighbors or friends who can help in medical emergencies.",
      },
      home_remedy: {
        pattern: "Self-Treatment",
        insight:
          "You showed confidence in home remedies, which can be helpful for minor issues but may delay necessary medical care for serious conditions.",
        recommendation:
          "Learn which symptoms require professional medical attention versus which can be managed at home.",
      },
      telehealth: {
        pattern: "Information-Seeking",
        insight:
          "You sought professional advice remotely before making a decision, which is a balanced approach to healthcare.",
        recommendation:
          "Save telehealth numbers in your phone for future reference, and consider signing up for a telehealth service if available in your area.",
      },
    },
  },
}

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const storyId = params.id as string

  const [currentScene, setCurrentScene] = useState<any>(null)
  const [storyHistory, setStoryHistory] = useState<string[]>([])
  const [userChoices, setUserChoices] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [insights, setInsights] = useState<any[]>([])
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [totalScenes, setTotalScenes] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from an API or generate with AI
    if (storyData[storyId]) {
      setCurrentScene(storyData[storyId].initialScene)
      setStoryHistory([storyData[storyId].initialScene.content])
      setIsLoading(false)

      // Calculate total possible scenes for progress bar
      const scenes = Object.keys(storyData[storyId].scenes).length + 1 // +1 for initial scene
      setTotalScenes(scenes)
      setProgress((1 / scenes) * 100)
    } else {
      // Handle story not found
      toast({
        title: "Story not found",
        description: "We couldn't find the story you're looking for.",
        variant: "destructive",
      })
      router.push("/stories")
    }
  }, [storyId, router, toast])

  const handleChoice = (choiceId: string, nextSceneId: string) => {
    if (!storyData[storyId]) return

    // Record user choice (limit array size for safety)
    if (userChoices.length < 100) {
      setUserChoices((prev) => [...prev, choiceId])
    }

    if (nextSceneId === "end") {
      setIsComplete(true)
      setProgress(100)

      // Generate insights based on choices (limit to first 5 choices for safety)
      const safeChoices = userChoices.slice(0, 5)
      const userInsights = safeChoices
        .map((choice) => {
          if (storyData[storyId].insights[choice]) {
            return storyData[storyId].insights[choice]
          }
          return null
        })
        .filter(Boolean)

      setInsights(userInsights)
      return
    }

    const nextScene = storyData[storyId].scenes[nextSceneId]
    if (nextScene) {
      setCurrentScene(nextScene)

      // Limit history array size for safety
      if (storyHistory.length < 100) {
        setStoryHistory((prev) => [...prev, nextScene.content])
      }

      // Update progress
      const newProgress = Math.min(((storyHistory.length + 1) / totalScenes) * 100, 95)
      setProgress(newProgress)

      // Scroll to bottom of content
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (!audioEnabled && currentScene) {
      // In a real implementation, this would use the Web Speech API
      toast({
        title: "Text-to-Speech",
        description: "In a full implementation, this would read the story aloud using TTS.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-teal-200 opacity-25"></div>
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-teal-600 animate-spin"></div>
          </div>
          <p className="text-teal-800 text-xl font-medium">Loading your health journey...</p>
          <p className="text-gray-500 mt-2">Preparing an immersive experience just for you</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            className="text-teal-700 hover:text-teal-900 hover:bg-teal-50 group"
            onClick={() => router.push("/stories")}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" /> Back to
            Stories
          </Button>
          <Button
            variant="outline"
            className={cn(
              "border-2 transition-all duration-300",
              audioEnabled
                ? "border-teal-400 text-teal-700 bg-teal-50"
                : "border-gray-200 text-gray-700 bg-white hover:border-teal-200",
            )}
            onClick={toggleAudio}
          >
            {audioEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
            {audioEnabled ? "Narration On" : "Enable Narration"}
          </Button>
        </div>

        <StoryProgress progress={progress} />

        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-white p-6 rounded-t-2xl shadow-md border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{storyData[storyId]?.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">Pediatrics</span>
              <span className="mx-2">•</span>
              <span>15 min</span>
              <span className="mx-2">•</span>
              <span>Beginner</span>
            </div>
          </div>

          <div className="space-y-6 mb-8 bg-white p-6 rounded-b-2xl shadow-md">
            {storyHistory.map((content, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl transition-all duration-500",
                  index === storyHistory.length - 1
                    ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-teal-400"
                    : "bg-gray-50 text-gray-600",
                )}
              >
                <p className="leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          {isComplete ? (
            <div className="space-y-8 bg-white p-8 rounded-2xl shadow-md">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Story Complete!</h2>
                <p className="text-gray-600">
                  Based on your choices, we've prepared some personalized health insights for you.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-teal-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Your Health Insights
              </h3>

              {insights.length > 0 ? (
                <div className="space-y-6">
                  {insights.map((insight, index) => (
                    <InsightCard
                      key={index}
                      pattern={insight.pattern}
                      insight={insight.insight}
                      recommendation={insight.recommendation}
                      severity={index === 0 ? "high" : index === 1 ? "medium" : "low"}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md">
                  <p className="text-gray-700">
                    In a complete implementation, you would receive personalized insights based on your choices
                    throughout the story.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button
                  className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white rounded-xl py-6"
                  onClick={() => router.push("/dashboard")}
                >
                  View Your Health Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 rounded-xl py-6"
                  onClick={() => router.push("/stories")}
                >
                  Explore More Stories
                </Button>
              </div>
            </div>
          ) : (
            currentScene && (
              <div className="bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  What will you do?
                </h2>
                <div className="space-y-4">
                  {currentScene.choices.map((choice, index) => (
                    <StoryChoice
                      key={choice.id}
                      text={choice.text}
                      onClick={() => handleChoice(choice.id, choice.nextScene)}
                      delay={index * 150}
                    />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
