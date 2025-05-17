import CreateStoryForm from "@/components/create-story-form"

export default function CreateStoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-teal-800 mb-4">Create Your Custom Health Story</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tell us what health topics you're interested in, and our AI will generate a personalized interactive story
              just for you.
            </p>
          </div>

          <CreateStoryForm />
        </div>
      </div>
    </div>
  )
}
