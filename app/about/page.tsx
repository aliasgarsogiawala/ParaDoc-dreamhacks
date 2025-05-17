import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Heart, Shield, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-6">About HealthLore</h1>
            <p className="text-xl text-gray-600">
              Revolutionizing healthcare education through interactive storytelling
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Our Mission</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <p className="text-gray-700 leading-relaxed mb-4">
                  HealthLore was created with a simple but powerful mission: to make healthcare education engaging,
                  accessible, and personalized for everyone. We believe that understanding your health shouldn't be
                  confusing or boring.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By combining the power of artificial intelligence with interactive storytelling, we've created a
                  platform that adapts to your unique health journey, providing insights and education that are relevant
                  to your specific needs and behaviors.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our goal is to empower individuals to make better health decisions through knowledge, awareness, and
                  gentle guidance – all delivered in an engaging format that feels more like entertainment than
                  education.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-800 mb-6">How HealthLore Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="bg-teal-100 p-3 rounded-full w-fit mb-4">
                      <Brain className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle>AI-Powered Stories</CardTitle>
                    <CardDescription>Interactive health scenarios tailored to your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Our advanced AI generates realistic health scenarios that adapt based on your choices. Each story
                      is designed to be both educational and engaging, covering a wide range of health topics.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="bg-teal-100 p-3 rounded-full w-fit mb-4">
                      <Zap className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle>Pattern Analysis</CardTitle>
                    <CardDescription>Learning from your decision patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      As you navigate through stories, our system analyzes your decision patterns to identify potential
                      health behaviors, knowledge gaps, and areas for improvement in your real-life health management.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="bg-teal-100 p-3 rounded-full w-fit mb-4">
                      <Heart className="h-6 w-6 text-teal-600" />
                    </div>
                    <CardTitle>Personalized Insights</CardTitle>
                    <CardDescription>Tailored recommendations for your health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Based on your interactions, HealthLore provides personalized health insights and gentle nudges to
                      help you improve your health knowledge, preventative care habits, and response to potential health
                      issues.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Our Impact</h2>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="bg-teal-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-800 mb-2">10,000+</h3>
                    <p className="text-gray-600">Active Users</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Brain className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-800 mb-2">50+</h3>
                    <p className="text-gray-600">Health Topics</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-teal-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-800 mb-2">85%</h3>
                    <p className="text-gray-600">Improved Health Awareness</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  HealthLore is making a real difference in how people understand and manage their health. Our users
                  report increased confidence in making health decisions, better recognition of warning signs, and
                  improved preventative health behaviors after using our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Our Team</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Healthcare Professionals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Our content is developed in collaboration with doctors, nurses, and public health experts to
                      ensure medical accuracy and relevance.
                    </p>
                    <p className="text-gray-700">
                      Every story and health insight is reviewed by our medical advisory board before being added to our
                      platform.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>AI & Technology Experts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      Our team of AI specialists, data scientists, and software engineers work together to create a
                      seamless, intelligent platform that learns and adapts to each user.
                    </p>
                    <p className="text-gray-700">
                      We're constantly improving our algorithms to provide more accurate and helpful health insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="text-center">
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Ready to Start Your Health Journey?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of users who are improving their health knowledge through interactive storytelling
              </p>
              <Link href="/stories">
                <Button className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-6" size="lg">
                  Explore Health Stories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
