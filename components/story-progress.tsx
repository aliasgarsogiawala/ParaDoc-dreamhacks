interface StoryProgressProps {
  progress: number
}

export function StoryProgress({ progress }: StoryProgressProps) {
  return (
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
        style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
      />
    </div>
  )
}
