"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Stethoscope, Download, ArrowRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function InsightSummary() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      ref={ref}
      className="relative"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={container}
    >
      <motion.div
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-transparent to-slate-200 dark:to-slate-700"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        variants={item}
        className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-white flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isInView ? [0, 15, 0, -15, 0] : 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mr-3 text-medical-blue dark:text-blue-300"
            >
              <Stethoscope className="h-7 w-7" />
            </motion.div>
            Recommended Action
          </h2>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-medical-blue text-medical-blue hover:bg-medical-blue/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/30 rounded-full"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Visit
            </Button>
          </motion.div>
        </div>

        <motion.div variants={item} className="space-y-6">
          <div className="bg-medical-blue/10 dark:bg-blue-900/20 rounded-xl p-6 border border-medical-blue/20 dark:border-blue-700/30">
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Based on your symptoms, we recommend scheduling an appointment with your primary care physician within the
              next <span className="font-semibold text-medical-blue dark:text-blue-300">24-48 hours</span>. Early
              intervention can prevent potential complications and lead to a faster recovery. While waiting for your
              appointment, ensure you stay hydrated and get adequate rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-red-100 dark:bg-red-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white">Urgent Care</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    If symptoms worsen significantly before your appointment, consider visiting urgent care.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 justify-start px-0 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-transparent"
                  >
                    Find nearby <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-mint-green/20 dark:bg-mint-green/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Stethoscope className="h-6 w-6 text-mint-green dark:text-mint-green/80" />
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white">Primary Care</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    Schedule an appointment with your primary care physician within 24-48 hours.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 justify-start px-0 text-mint-green dark:text-mint-green/80 hover:text-mint-green/80 dark:hover:text-mint-green/60 hover:bg-transparent"
                  >
                    Call doctor <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-medical-blue/20 dark:bg-blue-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-medical-blue dark:text-blue-300" />
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white">Care Guide</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    Download a personalized care guide with detailed recommendations for your symptoms.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 justify-start px-0 text-medical-blue dark:text-blue-300 hover:text-medical-blue/80 dark:hover:text-blue-200 hover:bg-transparent"
                  >
                    Download PDF <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex justify-center mt-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-gradient-to-r from-medical-blue to-mint-green hover:from-medical-blue/90 hover:to-mint-green/90 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all shadow-lg hover:shadow-xl">
                <Download className="mr-2 h-5 w-5" />
                Download Complete Care Guide
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
