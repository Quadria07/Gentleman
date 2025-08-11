"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { sendInvitationRequest } from "@/lib/email"

export default function GentlemenRoundtable() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    country: "",
  })
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submissionCount, setSubmissionCount] = useState(1236)
  const [ratingCount, setRatingCount] = useState(524)
  const [averageRating, setAverageRating] = useState(4.8)
  const [activeMonth, setActiveMonth] = useState("july")

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Initialize countdown timer
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30) // 30 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    try {
      const result = await sendInvitationRequest(formData)

      if (result.success) {
        setSubmissionCount((prev) => prev + 1)
        setSubmitMessage("Thank you! Your invitation request has been sent successfully.")
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          gender: "",
          country: "",
        })
      } else {
        setSubmitMessage("Sorry, there was an error sending your request. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Sorry, there was an error sending your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRating = (value: number) => {
    setRating(value)
    setRatingCount((prev) => prev + 1)
    // Update average rating logic here
  }

  const monthThemes = {
    july: {
      title: "The Return of the Gentleman",
      description: "Brand & cultural relevance",
      count: submissionCount,
    },
    august: {
      title: "Virtue Made Visible",
      description: "Technology & utility",
      count: submissionCount + 150,
    },
    september: {
      title: "The Gentlemen's Economy",
      description: "Ecosystem building & future plans",
      count: submissionCount + 300,
    },
  }

  const ratingEmojis = ["😐", "😌", "🙂", "🤩", "🕴️"]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/luxury-gentleman-hero.png')`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Floating Bowler Hat Animation */}
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 rounded-full shadow-2xl"></div>
          <div className="absolute top-2 left-2 w-12 h-8 bg-black rounded-full shadow-inner"></div>
        </motion.div>

        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-40 left-10 w-8 h-8 bg-gold-400 rounded-full opacity-20"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-40 right-40 w-12 h-12 border-2 border-gold-400 rounded-full opacity-25"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Particle Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold-400 rounded-full opacity-40"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Content with Enhanced Animations */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to The Gentlemen Roundtable
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            A Monthly Conversation for a Reborn Class
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            A private event series exploring values, elegance, and the digital rebirth of the gentleman.
          </motion.p>

          {/* Enhanced Overlay Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Card className="bg-black/90 border-gold-500 border-2 max-w-md mx-auto backdrop-blur-lg shadow-2xl">
              <CardHeader>
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(251, 191, 36, 0.3)",
                      "0 0 40px rgba(251, 191, 36, 0.5)",
                      "0 0 20px rgba(251, 191, 36, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <CardTitle className="text-gold-400 font-serif text-xl">This Month's Theme</CardTitle>
                  <h3 className="text-2xl font-serif text-white">"The Return of the Gentleman"</h3>
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[
                    { value: timeLeft.days, label: "DAYS" },
                    { value: timeLeft.hours, label: "HOURS" },
                    { value: timeLeft.minutes, label: "MINUTES" },
                    { value: timeLeft.seconds, label: "SECONDS" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      animate={{
                        scale: [1, 1.05, 1],
                        color: ["#fbbf24", "#f59e0b", "#fbbf24"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.2,
                      }}
                    >
                      <div className="text-2xl font-bold text-gold-400">{item.value}</div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Registration Form Section */}
      <motion.section
        className="py-20 bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-4 text-white">Request Your Invitation</h2>
            <p className="text-gray-400 text-lg">Join an exclusive gathering of distinguished minds</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/95 border-gray-700 max-w-2xl mx-auto shadow-2xl backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Keep existing form fields but wrap each in motion.div */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="fullName" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white focus:border-gold-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white focus:border-gold-400 transition-colors"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="gender" className="text-white">
                      Gender
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-gold-400">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Label htmlFor="country" className="text-white">
                      Country
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white focus:border-gold-400">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-black font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending..." : "Request Invitation"}
                    </Button>
                  </motion.div>

                  {submitMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center p-3 rounded-md ${
                        submitMessage.includes("successfully")
                          ? "bg-green-900/50 text-green-400 border border-green-700"
                          : "bg-red-900/50 text-red-400 border border-red-700"
                      }`}
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Anticipation Rating Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif mb-8 text-white">Rate Your Anticipation</h2>

          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-4xl transition-all duration-200 hover:scale-110"
                >
                  {ratingEmojis[star - 1]}
                </button>
              ))}
            </div>

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-gold-400">{averageRating}/5</div>
              <div className="text-gray-400">Rated by {ratingCount.toLocaleString()} Future Guests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Snippet Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-black border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-white text-center">Behind The Roundtable</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-invert max-w-none text-center">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  The Gentlemen Roundtable is more than a talk — it's a table of values.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Over three transformative months, we invite thinkers, founders, tastemakers, and pioneers to
                  rediscover elegance, purpose, and digital excellence.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Each event explores a theme that brings culture, community, and class together. And you, Gentleman,
                  are invited.
                </p>
                <Button className="bg-gold-600 hover:bg-gold-700 text-black font-semibold">
                  Learn More About the Mission
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Month Tabs Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-serif mb-12 text-white text-center">Three Months of Transformation</h2>

          <Tabs value={activeMonth} onValueChange={setActiveMonth} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-8">
              <TabsTrigger
                value="july"
                className="text-white data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                July
              </TabsTrigger>
              <TabsTrigger
                value="august"
                className="text-white data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                August
              </TabsTrigger>
              <TabsTrigger
                value="september"
                className="text-white data-[state=active]:bg-gold-600 data-[state=active]:text-black"
              >
                September
              </TabsTrigger>
            </TabsList>

            {Object.entries(monthThemes).map(([month, theme]) => (
              <TabsContent key={month} value={month}>
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-3xl font-serif text-white mb-4">"{theme.title}"</h3>
                    <p className="text-xl text-gold-400 mb-6">{theme.description}</p>

                    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
                      <div>
                        <div className="text-2xl font-bold text-gold-400">{timeLeft.days}</div>
                        <div className="text-xs text-gray-400">DAYS</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold-400">{timeLeft.hours}</div>
                        <div className="text-xs text-gray-400">HOURS</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold-400">{timeLeft.minutes}</div>
                        <div className="text-xs text-gray-400">MINUTES</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gold-400">{timeLeft.seconds}</div>
                        <div className="text-xs text-gray-400">SECONDS</div>
                      </div>
                    </div>

                    <div className="text-gray-400">{theme.count.toLocaleString()} Registered Gentlemen</div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-2xl font-serif text-gold-400 mb-4">The Fraternity & Co.</div>
          <p className="text-gray-400">© {new Date().getFullYear()} The Fraternity & Co. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  )
}
