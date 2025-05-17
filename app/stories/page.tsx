import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, Plus, Star } from "lucide-react"

const featuredStories = [
  {
    id: "fever-dilemma",
    title: "The Fever Dilemma",
    description:
      "Your child has a fever in a village with limited medical access. Navigate this common but challenging scenario.",
    difficulty: "Beginner",
    duration: "15 min",
    category: "Pediatrics",
    featured: true,
  },
  {
    id: "stress-signals",
    title: "Stress Signals",
    description:
      "Recognize the early warning signs of burnout and stress-related health issues in this interactive journey.",
    difficulty: "Intermediate",
    duration: "20 min",
    category: "Mental Health",
    featured: true,
  },
  {
    id: "diabetes-detective",
    title: "Diabetes Detective",
    description:
      "Learn to identify the subtle signs of diabetes and make lifestyle choices that can prevent or manage it.",
    difficulty: "Intermediate",
    duration: "25 min",
    category: "Chronic Conditions",
    featured: false,
  },
  {
    id: "heart-health",
    title: "Heart Health Heroes",
    description:
      "Make daily decisions that impact heart health and learn to recognize warning signs of cardiovascular issues.",
    difficulty: "Beginner",
    duration: "15 min",
    category: "Cardiovascular",
    featured: false,
  },
  {
    id: "anxiety-adventure",
    title: "Anxiety Adventure",
    description:
      "Navigate through situations that trigger anxiety and learn coping mechanisms in this gentle, supportive story.",
    difficulty: "Advanced",
    duration: "30 min",
    category: "Mental Health",
    featured: false,
  },
  {
    id: "nutrition-quest",
    title: "Nutrition Quest",
    description:
      "Embark on a journey to understand balanced nutrition and make healthier food choices in everyday scenarios.",
    difficulty: "Beginner",
    duration: "20 min",
    category: "Nutrition",
    featured: false,
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Health Stories</h1>
            <p className="text-gray-600">Choose a story or create your own personalized health journey</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" /> Create Custom Story
          </Button>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" /> Featured Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredStories
              .filter((story) => story.featured)
              .map((story) => (
                <Link href={`/stories/${story.id}`} key={story.id}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-teal-100">
                    <CardHeader className="bg-teal-50 rounded-t-lg">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-teal-800">{story.title}</CardTitle>
                        <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">{story.category}</span>
                      </div>
                      <CardDescription>{story.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Brain className="mr-1 h-4 w-4" />
                        <span>{story.difficulty}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{story.duration}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-teal-800 mb-4">All Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredStories
              .filter((story) => !story.featured)
              .map((story) => (
                <Link href={`/stories/${story.id}`} key={story.id}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-teal-800">{story.title}</CardTitle>
                        <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                          {story.category}
                        </span>
                      </div>
                      <CardDescription>{story.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Brain className="mr-1 h-4 w-4" />
                        <span>{story.difficulty}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{story.duration}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
