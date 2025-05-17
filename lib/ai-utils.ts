import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Types for story generation
export interface StoryChoice {
  id: string
  text: string
  nextScene: string
}

export interface StoryScene {
  id: string
  content: string
  choices: StoryChoice[]
}

export interface StoryInsight {
  pattern: string
  insight: string
  recommendation: string
}

export interface GeneratedStory {
  title: string
  description: string
  category: string
  difficulty: string
  duration: string
  initialScene: StoryScene
  scenes: Record<string, StoryScene>
  insights: Record<string, StoryInsight>
}

// Function to generate a health story based on a topic
export async function generateHealthStory(topic: string): Promise<GeneratedStory | null> {
  try {
    const prompt = `
      Generate an interactive health story about ${topic}. 
      The story should be educational and help users understand health decisions and their consequences.
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Story title",
        "description": "Brief description of the story",
        "category": "Health category (e.g., Mental Health, Nutrition, etc.)",
        "difficulty": "Beginner, Intermediate, or Advanced",
        "duration": "Estimated time to complete (e.g., '15 min')",
        "initialScene": {
          "id": "start",
          "content": "Initial scenario description",
          "choices": [
            {
              "id": "unique_id",
              "text": "Choice text",
              "nextScene": "scene_id"
            },
            ...more choices
          ]
        },
        "scenes": {
          "scene_id": {
            "content": "Scene description",
            "choices": [
              {
                "id": "unique_id",
                "text": "Choice text",
                "nextScene": "next_scene_id"
              },
              ...more choices
            ]
          },
          ...more scenes
        },
        "insights": {
          "choice_id": {
            "pattern": "Health behavior pattern name",
            "insight": "Insight about this choice",
            "recommendation": "Health recommendation based on this pattern"
          },
          ...more insights
        }
      }
      
      Make sure the story has at least 5 different scenes with meaningful choices that reflect different health behaviors.
      Each choice should lead to a different path in the story.
      The story should eventually reach an end point.
      Include insights for at least 3 different choices that reflect different health behaviors.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert in healthcare education and storytelling. Create engaging, medically accurate interactive stories that help users learn about health topics through choices and consequences.",
    })

    // Parse the response as JSON
    return JSON.parse(text) as GeneratedStory
  } catch (error) {
    console.error("Error generating health story:", error)
    return null
  }
}

// Function to analyze user choices and generate health insights
export async function analyzeUserChoices(storyId: string, choices: string[]): Promise<StoryInsight[]> {
  try {
    const choicesString = choices.join(", ")

    const prompt = `
      Analyze the following choices made by a user in a health story (ID: ${storyId}):
      ${choicesString}
      
      Based on these choices, identify potential health behavior patterns and provide insights.
      Format the response as a JSON array of insights with the following structure:
      [
        {
          "pattern": "Health behavior pattern name",
          "insight": "Detailed insight about this pattern",
          "recommendation": "Specific health recommendation based on this pattern"
        },
        ...more insights
      ]
      
      Provide at least 2 insights that cover different aspects of health behavior.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert in behavioral health analysis. Provide insightful, helpful, and non-judgmental analysis of health behaviors based on user choices in interactive scenarios.",
    })

    // Parse the response as JSON
    return JSON.parse(text) as StoryInsight[]
  } catch (error) {
    console.error("Error analyzing user choices:", error)
    return []
  }
}

// Function to generate a custom health story based on user preferences
export async function generateCustomStory(
  healthTopic: string,
  userPreferences: {
    difficulty: string
    focusArea: string
    personalContext?: string
  },
): Promise<GeneratedStory | null> {
  try {
    const { difficulty, focusArea, personalContext } = userPreferences

    const prompt = `
      Generate a custom interactive health story about ${healthTopic} with the following specifications:
      - Difficulty level: ${difficulty}
      - Focus area: ${focusArea}
      ${personalContext ? `- Personal context: ${personalContext}` : ""}
      
      The story should be educational and help users understand health decisions and their consequences.
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Story title",
        "description": "Brief description of the story",
        "category": "Health category (e.g., Mental Health, Nutrition, etc.)",
        "difficulty": "${difficulty}",
        "duration": "Estimated time to complete (e.g., '15 min')",
        "initialScene": {
          "id": "start",
          "content": "Initial scenario description",
          "choices": [
            {
              "id": "unique_id",
              "text": "Choice text",
              "nextScene": "scene_id"
            },
            ...more choices
          ]
        },
        "scenes": {
          "scene_id": {
            "content": "Scene description",
            "choices": [
              {
                "id": "unique_id",
                "text": "Choice text",
                "nextScene": "next_scene_id"
              },
              ...more choices
            ]
          },
          ...more scenes
        },
        "insights": {
          "choice_id": {
            "pattern": "Health behavior pattern name",
            "insight": "Insight about this choice",
            "recommendation": "Health recommendation based on this pattern"
          },
          ...more insights
        }
      }
      
      Make sure the story has at least 5 different scenes with meaningful choices that reflect different health behaviors.
      Each choice should lead to a different path in the story.
      The story should eventually reach an end point.
      Include insights for at least 3 different choices that reflect different health behaviors.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert in healthcare education and storytelling. Create engaging, medically accurate interactive stories that help users learn about health topics through choices and consequences. Tailor the story to the user's preferences and personal context.",
    })

    // Parse the response as JSON
    return JSON.parse(text) as GeneratedStory
  } catch (error) {
    console.error("Error generating custom health story:", error)
    return null
  }
}
