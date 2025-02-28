"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Brain, BookOpen, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Updated topics array with exactly five new topics
const topics = [
  {
    id: 1,
    title: "First-Principles Thinking",
    description: "Break down complex problems to their fundamentals",
    color: "#9b5de5",
    icon: "🧠",
    progress: 0,
    position: { x: 10, y: 60 },
    content: {
      title: "First-Principles Thinking",
      sections: [
        {
          title: "Defining First Principles",
          text: "Identify the fundamental truths of a problem, stripping away assumptions.",
        },
        {
          title: "Real-World Applications",
          text: "Used by innovators to rethink challenges from the ground up.",
        },
      ],
    },
  },
  {
    id: 2,
    title: "Bayesian Reasoning",
    description: "Update beliefs based on new evidence",
    color: "#00bbf9",
    icon: "🔮",
    progress: 0,
    position: { x: 35, y: 40 },
    content: {
      title: "Bayesian Reasoning",
      sections: [
        {
          title: "Bayes' Theorem",
          text: "A formula describing how to update probabilities with new evidence.",
        },
        {
          title: "Practical Examples",
          text: "Used in spam filtering, medical diagnostics, and everyday decisions.",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Systems Thinking",
    description: "Analyze complex systems by understanding interconnections",
    color: "#00f5d4",
    icon: "🔗",
    progress: 0,
    position: { x: 60, y: 70 },
    content: {
      title: "Systems Thinking",
      sections: [
        {
          title: "Interconnected Components",
          text: "View systems as sets of parts that interact to produce overall behavior.",
        },
        {
          title: "Feedback Loops",
          text: "Positive and negative feedback loops shape how a system evolves.",
        },
      ],
    },
  },
  {
    id: 4,
    title: "Lateral Thinking",
    description: "Approach problems creatively from new perspectives",
    color: "#FF9F1C",
    icon: "💡",
    progress: 0,
    position: { x: 80, y: 30 },
    content: {
      title: "Lateral Thinking",
      sections: [
        {
          title: "Breaking Rigid Patterns",
          text: "Avoid habitual reasoning by challenging established assumptions.",
        },
        {
          title: "Techniques & Exercises",
          text: "Brainstorming, random word association, and provocation methods.",
        },
      ],
    },
  },
  {
    id: 5,
    title: "Mental Models",
    description: "Leverage cognitive frameworks for better decisions",
    color: "#E63946",
    icon: "🏆",
    progress: 0,
    position: { x: 95, y: 60 },
    content: {
      title: "Mental Models",
      sections: [
        {
          title: "What Are Mental Models?",
          text: "Cognitive frameworks that simplify complex realities for clearer thinking.",
        },
        {
          title: "Examples in Action",
          text: "Occam’s Razor, Inversion, and other models to streamline decision-making.",
        },
      ],
    },
  },
]

// Generate a curved path from topic to topic
const generatePathPoints = () => {
  let pathD = `M ${topics[0].position.x} ${topics[0].position.y}`

  for (let i = 1; i < topics.length; i++) {
    const prev = topics[i - 1].position
    const curr = topics[i].position
    const midX = (prev.x + curr.x) / 2

    // Create a curved path between points
    pathD += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`
  }

  return pathD
}

export default function LearningPathway() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [progress, setProgress] = useState(0)
  const [completedTopics, setCompletedTopics] = useState([])
  const [pathAnimation, setPathAnimation] = useState(0)

  // Animate the path on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setPathAnimation(100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic)
  }

  const handleCloseModule = () => {
    setSelectedTopic(null)
  }

  // Each topic has 2 sections => each completion adds 50% to topic.progress
  const completeSection = () => {
    if (!selectedTopic) return

    const updatedTopics = [...topics]
    const topicIndex = updatedTopics.findIndex((t) => t.id === selectedTopic.id)
    if (topicIndex !== -1) {
      updatedTopics[topicIndex].progress += 50

      // Mark topic completed if it reaches 100%
      if (updatedTopics[topicIndex].progress >= 100 && !completedTopics.includes(selectedTopic.id)) {
        setCompletedTopics([...completedTopics, selectedTopic.id])
      }

      // Update overall progress
      const totalProgress =
        (updatedTopics.reduce((sum, t) => sum + t.progress, 0) / (updatedTopics.length * 100)) * 100
      setProgress(totalProgress)

      // Update selectedTopic in state to reflect new progress
      setSelectedTopic({ ...selectedTopic, progress: updatedTopics[topicIndex].progress })
    }
  }

  const pathD = generatePathPoints()

  return (
    // Use h-screen to force the container to exactly match the viewport height and prevent vertical scroll on the page.
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl overflow-hidden p-6">
      {/* Header / Title */}
      <div className="absolute top-4 left-4">
        <h2 className="text-2xl font-bold text-purple-800">Learning Pathway</h2>
        <p className="text-purple-600">Master geometry concepts step by step</p>
      </div>

      {/* Progress on the top right */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-purple-700">{Math.round(progress)}% Complete</span>
          <Progress value={progress} className="w-24 h-2" />
        </div>
      </div>

      {/* The curved path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d={pathD}
          fill="none"
          stroke="#d8b4fe"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathAnimation / 100 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Topic nodes */}
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          className="absolute"
          style={{
            left: `${topic.position.x}%`,
            top: `${topic.position.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
        >
          <motion.button
            className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-lg ${
              completedTopics.includes(topic.id) ? "bg-green-100" : "bg-white"
            }`}
            style={{
              border: `3px solid ${topic.color}`,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTopicClick(topic)}
          >
            <span className="text-2xl">{topic.icon}</span>
            {completedTopics.includes(topic.id) && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            )}
            {topic.progress > 0 && topic.progress < 100 && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={topic.color}
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 28 * (topic.progress / 100)} ${
                    2 * Math.PI * 28 * (1 - topic.progress / 100)
                  }`}
                  strokeLinecap="round"
                />
              </svg>
            )}
          </motion.button>
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.2 }}
          >
            <span className="whitespace-nowrap text-sm font-medium" style={{ color: topic.color }}>
              {topic.title}
            </span>
          </motion.div>
        </motion.div>
      ))}

      {/* Learning module popup */}
      {selectedTopic && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleCloseModule}
        >
          <motion.div
            className="w-full max-w-2xl bg-white rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6" style={{ borderTop: `8px solid ${selectedTopic.color}` }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge className="mb-2" style={{ backgroundColor: selectedTopic.color }}>
                    Module {selectedTopic.id} of {topics.length}
                  </Badge>
                  <h3 className="text-2xl font-bold">{selectedTopic.content.title}</h3>
                  <p className="text-gray-500">{selectedTopic.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseModule}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 space-y-6">
                {selectedTopic.content.sections.map((section, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-5 w-5" style={{ color: selectedTopic.color }} />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{section.text}</p>
                      <div className="mt-4">
                        <motion.div
                          className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span className="text-gray-500">Interactive visualization would appear here</span>
                        </motion.div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="ml-auto"
                        onClick={completeSection}
                        style={{ backgroundColor: selectedTopic.color }}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Complete Section
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Progress:</span>
                  <Progress value={selectedTopic.progress} className="w-24 h-2" />
                  <span className="text-sm">{selectedTopic.progress}%</span>
                </div>
                {selectedTopic.progress >= 100 ? (
                  <Badge className="bg-green-500">Completed</Badge>
                ) : (
                  <Badge className="bg-blue-500">In Progress</Badge>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
