"use client";
import PageTransition from "@/components/animations/page-transition";
import Hero from "@/components/hero";
import InsightSummary from "@/components/insight-summary";
import SimulatedOutcomes from "@/components/simulated-outcomes";
import SplashScreen from "@/components/splash-screen";
import FloatingActionButton from "@/components/ui-elements/floating-action-button";
import { HeroWave } from "@/components/ui/hero-wave";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const {} = useUser();
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainContent(true);
    }, 5100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <SplashScreen />
      {showMainContent && (
        <PageTransition>
          <section className="relative pt-20 pb-32 overflow-hidden min-h-screen flex items-center justify-center">
            <HeroWave className="absolute top-0 left-0 w-full h-auto" />
            <Hero />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
          </section>
          <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
            <main className="mt-8 space-y-16">
              <Suspense
                fallback={
                  <div className="h-[500px] flex items-center justify-center">
                    Loading outcomes...
                  </div>
                }
              >
                <SimulatedOutcomes />
              </Suspense>

              <Suspense
                fallback={
                  <div className="h-[300px] flex items-center justify-center">
                    Loading insights...
                  </div>
                }
              >
                <InsightSummary />
              </Suspense>
            </main>
            <FloatingActionButton
              icon={<Mic size={24} />}
              tooltip="Voice Input"
              position="bottom-right"
            />
          </div>
        </PageTransition>
      )}
    </div>
  );
}
