"use client";

import { useState, useEffect } from "react";
import {
  Brain,
  AlertCircle,
  Lightbulb,
  Users,
  Scale,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(false);

  // Fetch today's challenge from the backend (Runs only once)
  useEffect(() => {
    fetch("http://localhost:5001/api/challenges/daily")
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching challenge:", err);
        setLoading(false);
      });
  }, []);

  // Handle Answer Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      alert("Please write your response before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5001/api/challenges/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: challenge?._id, answer }),
      });
      if (!res.ok) throw new Error("Failed to submit answer");
      const data = await res.json();
      setFeedback(data.analysis || {});
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to process your response. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 p-4 md:p-8 space-y-6">
      {loading ? (
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      ) : (
        <>
          {/* Main Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {challenge?.title || "Daily Critical Thinking Challenge"}
            </h1>
            {/* Challenge Details */}
            <Card className="border-2 border-primary/20 bg-blue-50 shadow-md">
              <CardHeader className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl">Challenge Details</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center">
                  {challenge?.description ||
                    "A bank's alarm triggers silently every day at noon, but no theft occurs. After a month, $1 million vanishes. What's happening?"}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* User's Answer */}
          <Card className="border-2 border-primary/20 bg-green-50 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Your Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className={`border w-full p-3 h-32 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !showFullAnswer && "line-clamp-3"
                }`}
                placeholder="Write your response..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Answer"}
              </Button>
            </CardFooter>
          </Card>

          {/* Answer Analysis Card */}
          {feedback && (
            <Card className="border-2 border-primary/20 bg-purple-50 shadow-md">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-purple-800" />
                  <CardTitle className="text-xl">Answer Analysis</CardTitle>
                </div>
                <Badge className="font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-2xl px-4 py-2">
                  {feedback?.score?.total || 0}/100
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {feedback.decision_summary ||
                    "No summary available for your response."}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Detailed Feedback Section */}
          {feedback && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Score Breakdown */}
                <Card className="border-2 border-primary/20 bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Scale className="h-6 w-6 text-primary" />
                      Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feedback?.score?.breakdown ? (
                      <div className="space-y-4">
                        {Object.entries(feedback.score.breakdown).map(
                          ([key, value], index) => {
                            // If the score exceeds the max, clamp it to the max
                            const actualScore = Math.min(value.score, value.max);

                            return (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="space-y-2"
                              >
                                <div className="flex justify-between text-sm">
                                  <span>{key.replace(/_/g, " ")}</span>
                                  <span className="font-medium">
                                    {actualScore} / {value.max}
                                  </span>
                                </div>
                                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: (() => {
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("logical")
                                        )
                                          return "#3b82f6"; // blue
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("analysis")
                                        )
                                          return "#8b5cf6"; // purple
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("consequences")
                                        )
                                          return "#6366f1"; // indigo
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("biases")
                                        )
                                          return "#ec4899"; // pink
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("creativity")
                                        )
                                          return "#f97316"; // orange
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("ethical")
                                        )
                                          return "#22c55e"; // green
                                        if (
                                          key
                                            .toLowerCase()
                                            .includes("communication")
                                        )
                                          return "#14b8a6"; // teal
                                        return "#6b7280"; // gray
                                      })(),
                                      width: `${
                                        (actualScore / value.max) * 100
                                      }%`,
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${
                                        (actualScore / value.max) * 100
                                      }%`,
                                    }}
                                    transition={{
                                      duration: 1,
                                      delay: index * 0.1,
                                    }}
                                  />
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <p>No score breakdown available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Cognitive Biases */}
                <Card className="border-2 border-primary/20 bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-primary" />
                      Identified Cognitive Biases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feedback?.cognitive_biases &&
                    feedback.cognitive_biases.length > 0 ? (
                      <div className="space-y-4">
                        {feedback.cognitive_biases.map((bias, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg bg-${
                              ["yellow", "blue", "green", "red"][index % 4]
                            }-100 border border-${
                              ["yellow", "blue", "green", "red"][index % 4]
                            }-200`}
                          >
                            <h3
                              className={`font-semibold text-${
                                ["yellow", "blue", "green", "red"][index % 4]
                              }-700 mb-2`}
                            >
                              {bias.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {bias.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No cognitive biases identified.</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Alternative Perspective & Thinker Comparison */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-2 border-primary/20 bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      Alternative Perspective
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      {feedback.alternative_perspective ||
                        "No alternative perspective available."}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary/20 bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      Thinker Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="elon-musk">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                              <Brain className="h-4 w-4 text-yellow-700" />
                            </div>
                            <span className="font-medium text-yellow-700">
                              Elon Musk's Approach
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {feedback?.thinker_comparison?.elon_musk ||
                            "No comparison available."}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="charlie-munger">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                              <Scale className="h-4 w-4 text-green-700" />
                            </div>
                            <span className="font-medium text-green-700">
                              Charlie Munger's Approach
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {feedback?.thinker_comparison?.charlie_munger ||
                            "No comparison available."}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Suggestions */}
              <Card className="border-2 border-primary/20 bg-white shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-green-100 border border-green-200">
                      <CheckCircle2 className="h-5 w-5 text-green-700 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-700">
                          Strengths
                        </h4>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                          {feedback?.strengths?.length > 0
                            ? feedback.strengths.map((s, i) => <li key={i}>{s}</li>)
                            : (
                              <>
                                <li>Clear logical progression in reasoning</li>
                                <li>Good understanding of human behavior patterns</li>
                                <li>Effective communication of ideas</li>
                              </>
                            )}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-orange-100 border border-orange-200">
                      <AlertTriangle className="h-5 w-5 text-orange-700 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-700">
                          Areas to Focus On
                        </h4>
                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                          {feedback?.areas_for_improvement?.length > 0
                            ? feedback.areas_for_improvement.map((s, i) => <li key={i}>{s}</li>)
                            : (
                              <>
                                <li>Consider more alternative scenarios</li>
                                <li>Explore broader system implications</li>
                                <li>
                                  Analyze potential cognitive biases more deeply
                                </li>
                              </>
                            )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-indigo-500 hover:bg-indigo-600 gap-2">
                    Try Another Challenge
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
