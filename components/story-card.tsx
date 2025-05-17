import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock } from "lucide-react"

interface StoryCardProps {
  id: string
  title: string
  description: string
  difficulty: string
  duration: string
  category: string
  featured?: boolean
}

export default function StoryCard({
  id,
  title,
  description,
  difficulty,
  duration,
  category,
  featured = false,
}: StoryCardProps) {
  return (
    <Link href={`/stories/${id}`}>
      <Card
        className={`h-full hover:shadow-lg transition-shadow cursor-pointer ${featured ? "border-2 border-teal-100" : ""}`}
      >
        <CardHeader className={featured ? "bg-teal-50 rounded-t-lg" : ""}>
          <div className="flex justify-between items-start">
            <CardTitle className="text-teal-800">{title}</CardTitle>
            <span
              className={`${featured ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-800"} text-xs px-2 py-1 rounded-full`}
            >
              {category}
            </span>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Brain className="mr-1 h-4 w-4" />
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
