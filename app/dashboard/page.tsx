"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  AlertCircle,
  Award,
  BarChart2,
  BookOpen,
  Brain,
  Calendar,
  Clock,
  Heart,
  Info,
  Lightbulb,
  Shield,
  User,
} from "lucide-react"

// Mock user data - in a real app, this would come from a database
const userData = {
  name: "Alex Johnson",
  storiesCompleted: 7,
  insights: [
    {
      id: "delayed-action",
      pattern: "Delayed Action",
      description: "You tend to wait before seeking medical help, which can be risky in certain situations.",
      severity: "high",
      recommendations: [
        "Create an emergency health plan for yourself and your family",
        "Save important medical numbers in your phone",
        "Learn which symptoms require immediate attention",
      ],
      relatedStories: ["The Fever Dilemma", "Heart Health Heroes"],
    },
    {
      id: "stress-management",
      pattern: "Stress Management",
      description: "Your choices indicate you may be experiencing high stress levels that could impact your health.",
      severity: "medium",
      recommendations: [
        "Try a 5-minute daily meditation practice",
        "Schedule regular breaks during your workday",
        "Consider talking to a mental health professional",
      ],
      relatedStories: ["Stress Signals", "Anxiety Adventure"],
    },
    {
      id: "nutrition-awareness",
      pattern: "Nutrition Awareness",
      description: "You show good knowledge of nutrition basics but may benefit from more specific information.",
      severity: "low",
      recommendations: [
        "Track your meals for a week to identify patterns",
        "Learn about portion sizes for different food groups",
        "Try incorporating more plant-based meals",
      ],
      relatedStories: ["Nutrition Quest"],
    },
  ],
  healthMetrics: {
    knowledgeScore: 72,
    preventionScore: 58,
    responseScore: 64,
    wellnessScore: 68,
  },
  recentActivity: [
    {
      type: "story_completed",
      title: "The Fever Dilemma",
      date: "2 days ago",
      insights: 3,
    },
    {
      type: "insight_generated",
      title: "Stress Management Pattern Detected",
      date: "2 days ago",
      description: "Based on your choices in 'Stress Signals'",
    },
    {
      type: "story_completed",
      title: "Nutrition Quest",
      date: "1 week ago",
      insights: 2,
    },
  ],
  upcomingStories: [
    {
      title: "Sleep Cycle Secrets",
      category: "Wellness",
      releaseDate: "Tomorrow",
    },
    {
      title: "Back Pain Breakthrough",
      category: "Physical Health",
      releaseDate: "3 days",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Your Health Dashboard</h1>
            <p className="text-gray-600">Track your progress and discover personalized health insights</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-teal-100 p-2 rounded-full mr-3">
              <User className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="font-medium text-teal-800">{userData.name}</p>
              <p className="text-sm text-gray-500">{userData.storiesCompleted} stories completed</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              Insights
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              Health Metrics
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-teal-100 data-[state=active]:text-teal-800">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Knowledge Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-800">{userData.healthMetrics.knowledgeScore}%</div>
                    <Brain className="h-5 w-5 text-teal-600" />
                  </div>
                  <Progress value={userData.healthMetrics.knowledgeScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Prevention Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-800">{userData.healthMetrics.preventionScore}%</div>
                    <Shield className="h-5 w-5 text-teal-600" />
                  </div>
                  <Progress value={userData.healthMetrics.preventionScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Response Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-800">{userData.healthMetrics.responseScore}%</div>
                    <Activity className="h-5 w-5 text-teal-600" />
                  </div>
                  <Progress value={userData.healthMetrics.responseScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Wellness Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-teal-800">{userData.healthMetrics.wellnessScore}%</div>
                    <Heart className="h-5 w-5 text-teal-600" />
                  </div>
                  <Progress value={userData.healthMetrics.wellnessScore} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                    Priority Insights
                  </CardTitle>
                  <CardDescription>Health patterns that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.insights
                      .filter((insight) => insight.severity === "high")
                      .map((insight) => (
                        <div key={insight.id} className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                          <h3 className="font-semibold text-gray-800">{insight.pattern}</h3>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          <Button
                            variant="link"
                            className="text-teal-600 p-0 h-auto mt-2"
                            onClick={() => setActiveTab("insights")}
                          >
                            View recommendations
                          </Button>
                        </div>
                      ))}
                    {userData.insights.filter((insight) => insight.severity === "high").length === 0 && (
                      <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-md">
                        <p className="text-gray-700">No high-priority insights at this time. Great job!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-teal-600" />
                    Recent & Upcoming
                  </CardTitle>
                  <CardDescription>Your health journey timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.slice(0, 2).map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-teal-100 p-1.5 rounded-full mr-3 mt-0.5">
                          {activity.type === "story_completed" ? (
                            <BookOpen className="h-4 w-4 text-teal-600" />
                          ) : (
                            <Lightbulb className="h-4 w-4 text-teal-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-gray-200 my-3 pt-3">
                      <p className="text-sm font-medium text-gray-500 mb-3">Coming Soon</p>
                      {userData.upcomingStories.map((story, index) => (
                        <div key={index} className="flex items-start mb-3 last:mb-0">
                          <div className="bg-gray-100 p-1.5 rounded-full mr-3 mt-0.5">
                            <Clock className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{story.title}</p>
                            <p className="text-sm text-gray-500">
                              {story.category} • {story.releaseDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              {userData.insights.map((insight) => (
                <Card
                  key={insight.id}
                  className={cn(
                    "border-l-4",
                    insight.severity === "high"
                      ? "border-l-red-400"
                      : insight.severity === "medium"
                        ? "border-l-yellow-400"
                        : "border-l-green-400",
                  )}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-teal-800">{insight.pattern}</CardTitle>
                        <CardDescription className="text-base mt-1">{insight.description}</CardDescription>
                      </div>
                      <div
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          insight.severity === "high"
                            ? "bg-red-100 text-red-800"
                            : insight.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800",
                        )}
                      >
                        {insight.severity === "high"
                          ? "High Priority"
                          : insight.severity === "medium"
                            ? "Medium Priority"
                            : "Low Priority"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Lightbulb className="mr-2 h-4 w-4 text-teal-600" /> Recommendations
                      </h4>
                      <ul className="space-y-2 pl-6 list-disc text-gray-700">
                        {insight.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-teal-600" /> Related Stories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedStories.map((story, index) => (
                          <span key={index} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm">
                            {story}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-teal-600" />
                    Knowledge Score: {userData.healthMetrics.knowledgeScore}%
                  </CardTitle>
                  <CardDescription>Your understanding of health conditions and appropriate responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={userData.healthMetrics.knowledgeScore} className="h-2" />
                    <div className="bg-teal-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">
                            Your health knowledge is above average. Continue learning about preventative care to improve
                            this score.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Symptom Recognition</p>
                        <p className="font-medium text-gray-800">78%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Treatment Knowledge</p>
                        <p className="font-medium text-gray-800">65%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-teal-600" />
                    Prevention Score: {userData.healthMetrics.preventionScore}%
                  </CardTitle>
                  <CardDescription>Your tendency to take preventative health measures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={userData.healthMetrics.preventionScore} className="h-2" />
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">
                            Your prevention score could use improvement. Consider being more proactive about regular
                            check-ups and screenings.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Regular Screenings</p>
                        <p className="font-medium text-gray-800">52%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Lifestyle Choices</p>
                        <p className="font-medium text-gray-800">64%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-teal-600" />
                    Response Score: {userData.healthMetrics.responseScore}%
                  </CardTitle>
                  <CardDescription>How quickly and appropriately you respond to health issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={userData.healthMetrics.responseScore} className="h-2" />
                    <div className="bg-teal-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">
                            Your response score is moderate. You generally take appropriate action but sometimes delay
                            seeking help.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Emergency Response</p>
                        <p className="font-medium text-gray-800">70%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Follow-Through</p>
                        <p className="font-medium text-gray-800">58%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-teal-600" />
                    Wellness Score: {userData.healthMetrics.wellnessScore}%
                  </CardTitle>
                  <CardDescription>Your overall approach to maintaining health and wellbeing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={userData.healthMetrics.wellnessScore} className="h-2" />
                    <div className="bg-teal-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">
                            Your wellness score shows good awareness of holistic health practices. Continue focusing on
                            stress management.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Mental Health</p>
                        <p className="font-medium text-gray-800">62%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-xs text-gray-500 mb-1">Physical Health</p>
                        <p className="font-medium text-gray-800">74%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-teal-600" />
                  Your Health Journey
                </CardTitle>
                <CardDescription>Track your progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">Stories Completed</h3>
                    <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                      {userData.storiesCompleted} stories
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {userData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start border-l-2 border-teal-200 pl-4 pb-4">
                          <div className="bg-teal-100 p-1.5 rounded-full mr-3 mt-0.5">
                            {activity.type === "story_completed" ? (
                              <BookOpen className="h-4 w-4 text-teal-600" />
                            ) : (
                              <Lightbulb className="h-4 w-4 text-teal-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{activity.title}</p>
                            <p className="text-sm text-gray-500 mb-1">{activity.date}</p>
                            {activity.type === "story_completed" && (
                              <p className="text-sm text-teal-600">{activity.insights} new insights generated</p>
                            )}
                            {activity.type === "insight_generated" && activity.description && (
                              <p className="text-sm text-gray-600">{activity.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-4">Achievements</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-teal-50 p-4 rounded-md text-center">
                        <div className="bg-teal-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Award className="h-6 w-6 text-teal-600" />
                        </div>
                        <p className="font-medium text-teal-800">First Story</p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-md text-center">
                        <div className="bg-teal-100 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Brain className="h-6 w-6 text-teal-600" />
                        </div>
                        <p className="font-medium text-teal-800">Knowledge Seeker</p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-md text-center opacity-60">
                        <div className="bg-gray-200 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Shield className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="font-medium text-gray-500">Prevention Pro</p>
                        <p className="text-xs text-gray-500">Locked</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-md text-center opacity-60">
                        <div className="bg-gray-200 p-2 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <Heart className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="font-medium text-gray-500">Wellness Warrior</p>
                        <p className="text-xs text-gray-500">Locked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
