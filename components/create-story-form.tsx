"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Brain, Loader2 } from "lucide-react"

export default function CreateStoryForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "beginner",
    focusArea: "",
    personalContext: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, this would call the AI service to generate a story
      // For now, we'll simulate a delay and redirect to a pre-existing story
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Story Created",
        description: `Your custom story about ${formData.topic} has been generated!`,
      })

      // Redirect to a pre-existing story for demo purposes
      router.push("/stories/fever-dilemma")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your story. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-teal-800 flex items-center">
          <Brain className="mr-2 h-6 w-6 text-teal-600" />
          Create Your Custom Health Story
        </CardTitle>
        <CardDescription>
          Tell us what you're interested in, and we'll generate a personalized interactive health story
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Health Topic</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g., Stress management, Diabetes prevention, Sleep health"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <RadioGroup
              defaultValue="beginner"
              value={formData.difficulty}
              onValueChange={(value) => handleSelectChange("difficulty", value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="font-normal">
                  Beginner - Basic health concepts and decisions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="font-normal">
                  Intermediate - More complex scenarios and choices
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="font-normal">
                  Advanced - Challenging situations with nuanced decisions
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="focusArea">Focus Area</Label>
            <Select value={formData.focusArea} onValueChange={(value) => handleSelectChange("focusArea", value)}>
              <SelectTrigger id="focusArea">
                <SelectValue placeholder="Select a focus area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prevention">Preventative Care</SelectItem>
                <SelectItem value="emergency">Emergency Response</SelectItem>
                <SelectItem value="chronic">Chronic Condition Management</SelectItem>
                <SelectItem value="mental">Mental Health</SelectItem>
                <SelectItem value="nutrition">Nutrition & Diet</SelectItem>
                <SelectItem value="fitness">Physical Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personalContext">Personal Context (Optional)</Label>
            <Textarea
              id="personalContext"
              name="personalContext"
              placeholder="Add any personal context that might help tailor the story to your needs"
              value={formData.personalContext}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700"
            disabled={isLoading || !formData.topic || !formData.focusArea}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Your Story...
              </>
            ) : (
              "Create My Story"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
