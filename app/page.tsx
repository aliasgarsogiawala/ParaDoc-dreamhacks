import { Suspense } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import ThemeToggle from "@/components/theme-toggle"
import PageTransition from "@/components/animations/page-transition"
import BackgroundGradient from "@/components/ui-elements/background-gradient"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      <BackgroundGradient />

      <Suspense fallback={<LoadingScreen />}>
        <PageTransition>
          <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <Header />
            
            <main className="mt-16 flex flex-col items-center justify-center text-center">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to DreamHacks Health Simulator
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-10">
                Explore potential health outcomes based on your symptoms and receive personalized insights
                to better understand your health journey.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-16">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Symptom Analysis</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Input your symptoms and receive AI-powered analysis of potential conditions and outcomes.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Health Insights</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Get personalized recommendations and insights based on your health profile and symptoms.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/chat" 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
              >
                Get Started <ArrowRight size={20} />
              </Link>
            </main>

            <div className="fixed top-6 right-6 z-50">
              <ThemeToggle />
            </div>
          </div>
        </PageTransition>
      </Suspense>
    </div>
  )
}