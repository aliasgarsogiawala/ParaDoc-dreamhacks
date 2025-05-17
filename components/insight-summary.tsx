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
        className="bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <motion.div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-medical-blue/10 to-mint-green/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.5] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-tr from-mint-green/10 to-medical-blue/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.3] }}
          transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <motion.div 
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ 
                rotate: isInView ? [0, 15, 0, -15, 0] : 0,
                scale: [0.8, 1.1, 1]
              }}
              transition={{ 
                rotate: { delay: 0.5, duration: 1 },
                scale: { duration: 0.5 }
              }}
              className="mr-4 text-medical-blue dark:text-blue-300 bg-medical-blue/10 dark:bg-blue-900/30 p-3 rounded-full"
            >
              <Stethoscope className="h-8 w-8" />
            </motion.div>
            <div>
              <motion.div 
                className="text-xs font-medium text-medical-blue/70 dark:text-blue-300/70 mb-1 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Based on your symptoms
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-medical-blue to-mint-green bg-clip-text text-transparent">
                Recommended Action
              </h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="border-2 border-medical-blue text-medical-blue hover:bg-medical-blue/10 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-900/30 rounded-full px-5 py-2 font-medium shadow-sm hover:shadow transition-all duration-300"
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule Visit</span>
              <motion.span 
                className="ml-1 inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >→</motion.span>
            </Button>
          </motion.div>
        </div>

        <motion.div variants={item} className="space-y-8">
          <motion.div 
            className="bg-gradient-to-r from-medical-blue/10 to-mint-green/5 dark:from-blue-900/20 dark:to-teal-900/10 rounded-xl p-6 border border-medical-blue/20 dark:border-blue-700/30 relative overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-medical-blue to-mint-green"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
            
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              Based on your symptoms, we recommend scheduling an appointment with your primary care physician within the
              next <motion.span 
                className="font-semibold text-medical-blue dark:text-blue-300 inline-block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ["#4a9bd1", "#38bdf8", "#4a9bd1"]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >24-48 hours</motion.span>. Early
              intervention can prevent potential complications and lead to a faster recovery. While waiting for your
              appointment, ensure you stay hydrated and get adequate rest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              variants={item}
              custom={0}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="p-6 flex flex-col h-full relative">
                  <motion.div 
                    className="rounded-full bg-red-100 dark:bg-red-900/30 w-14 h-14 flex items-center justify-center mb-5 group-hover:shadow-md transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.05 }}
                  >
                    <Clock className="h-7 w-7 text-red-600 dark:text-red-400" />
                  </motion.div>
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white">Urgent Care</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    If symptoms worsen significantly before your appointment, consider visiting urgent care.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 justify-start px-0 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-transparent group"
                    >
                      Find nearby 
                      <motion.div
                        className="ml-1.5 h-4 w-4"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <ArrowRight />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={item}
              custom={1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full overflow-hidden group border-2 border-mint-green/20">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-mint-green/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div 
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                </motion.div>
                <CardContent className="p-6 flex flex-col h-full relative">
                  <motion.div 
                    className="rounded-full bg-mint-green/20 dark:bg-mint-green/10 w-14 h-14 flex items-center justify-center mb-5 group-hover:shadow-md transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.05 }}
                  >
                    <Stethoscope className="h-7 w-7 text-mint-green dark:text-mint-green/80" />
                  </motion.div>
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-mint-green/5 rounded-full blur-xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white flex items-center">
                    Primary Care
                    <motion.span 
                      className="ml-2 text-xs px-1.5 py-0.5 bg-mint-green/10 text-mint-green rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      Recommended
                    </motion.span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    Schedule an appointment with your primary care physician within 24-48 hours.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 justify-start px-0 text-mint-green dark:text-mint-green/80 hover:text-mint-green/80 dark:hover:text-mint-green/60 hover:bg-transparent group"
                    >
                      Call doctor 
                      <motion.div
                        className="ml-1.5 h-4 w-4"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <ArrowRight />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={item}
              custom={2}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)" }}
              className="transition-all duration-300"
            >
              <Card className="border-slate-200 dark:border-slate-700 h-full overflow-hidden group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-medical-blue/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="p-6 flex flex-col h-full relative">
                  <motion.div 
                    className="rounded-full bg-medical-blue/20 dark:bg-blue-900/30 w-14 h-14 flex items-center justify-center mb-5 group-hover:shadow-md transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.05 }}
                  >
                    <Download className="h-7 w-7 text-medical-blue dark:text-blue-300" />
                  </motion.div>
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 bg-medical-blue/5 rounded-full blur-xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-white">Care Guide</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex-grow">
                    Download a personalized care guide with detailed recommendations for your symptoms.
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 justify-start px-0 text-medical-blue dark:text-blue-300 hover:text-medical-blue/80 dark:hover:text-blue-200 hover:bg-transparent group"
                    >
                      Download PDF 
                      <motion.div
                        className="ml-1.5 h-4 w-4"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <ArrowRight />
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            variants={item} 
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-medical-blue to-mint-green rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [0.98, 1.01, 0.98]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Button className="relative bg-gradient-to-r from-medical-blue to-mint-green hover:from-medical-blue/90 hover:to-mint-green/90 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all shadow-lg hover:shadow-xl">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-2 h-5 w-5"
                >
                  <Download />
                </motion.div>
                Download Complete Care Guide
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
