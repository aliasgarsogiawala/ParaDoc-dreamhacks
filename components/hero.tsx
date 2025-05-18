import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 bg-teal-50 rounded-full mb-8 animate-fade-in-down">
          <span className="w-3 h-3 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-teal-800">
            Revolutionizing Health Education
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 bg-clip-text text-transparent animate-fade-in pb-5">
          Your Health Journey, Reimagined
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up">
          Interactive stories that educate, diagnose, and guide your healthcare
          decisions through immersive narratives tailored to your unique health
          profile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Link
            href={"/sign-in"}
            className="transition-transform hover:scale-105"
          >
            <Button
              className="group bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Start Your Journey{" "}
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-2 border-teal-200 text-teal-700 hover:bg-teal-50 text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:border-teal-400"
            size="lg"
          >
            How It Works
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-500">
          <div className="flex items-center bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-teal-100 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <span className="font-medium text-teal-800">AI-Powered</span>
              <p className="text-xs text-gray-600 mt-1">
                Advanced algorithms tailored to you
              </p>
            </div>
          </div>

          <div className="flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-emerald-100 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <span className="font-medium text-emerald-800">Personalized</span>
              <p className="text-xs text-gray-600 mt-1">
                Unique to your health journey
              </p>
            </div>
          </div>

          <div className="flex items-center bg-gradient-to-r from-teal-50 to-emerald-50 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-teal-100 rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <span className="font-medium text-teal-800">Evidence-Based</span>
              <p className="text-xs text-gray-600 mt-1">
                Backed by medical research
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
