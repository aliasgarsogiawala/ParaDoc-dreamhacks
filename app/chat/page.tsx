import PageTransition from "@/components/animations/page-transition";
import Header from "@/components/header";
import LoadingScreen from "@/components/loading-screen";
import SymptomInput from "@/components/symptom-input";
import ThemeToggle from "@/components/theme-toggle";
import BackgroundGradient from "@/components/ui-elements/background-gradient";
import FloatingActionButton from "@/components/ui-elements/floating-action-button";
import { Mic } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      <BackgroundGradient />

      <Suspense fallback={<LoadingScreen />}>
        <PageTransition>
          <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <Header />
            <main className="mt-8 space-y-16">
              <Suspense
                fallback={
                  <div className="h-[300px] flex items-center justify-center">
                    Loading symptom input...
                  </div>
                }
              >
                <SymptomInput />
              </Suspense>
            </main>

            <FloatingActionButton
              icon={<Mic size={24} />}
              tooltip="Voice Input"
              position="bottom-right"
            />

            <div className="fixed top-6 right-6 z-50">
              <ThemeToggle />
            </div>
          </div>
        </PageTransition>
      </Suspense>
    </div>
  );
}
