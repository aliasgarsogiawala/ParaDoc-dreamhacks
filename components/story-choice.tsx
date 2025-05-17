"use client"

interface StoryChoiceProps {
  text: string
  onClick: () => void
  delay?: number
}

export function StoryChoice({ text, onClick }: StoryChoiceProps) {
  return (
    <button
      className="w-full text-left p-6 rounded-xl border-2 border-gray-100 hover:border-teal-300 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md mb-4"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="mr-4 flex-shrink-0 w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-teal-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <span className="text-gray-800 font-medium">{text}</span>
      </div>
    </button>
  )
}
