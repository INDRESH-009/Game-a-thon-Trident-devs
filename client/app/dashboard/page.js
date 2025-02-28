"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Gamepad2,
  Lightbulb,
  Users,
  GraduationCapIcon as Graduation,
  Bell,
  Flame,
  Sparkles,
  ChevronRight,
  Brain,
  Award,
  TrendingUp,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [progress, setProgress] = useState(45);
  const [xpAnimation, setXpAnimation] = useState(false);

  useEffect(() => {
    // Simulate XP increase animation on load
    setTimeout(() => {
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 2000);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {/* Top section: Three cards in a grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* User Overview Panel */}
            <Card className="border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-blue-900">Your Thinking Journey</CardTitle>
                <CardDescription className="text-blue-700">Level 7 Thinker</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-blue-400">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
                    <AvatarFallback className="text-2xl">TM</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-blue-900">Alex Johnson</div>
                      <div
                        className={`flex items-center gap-1 font-bold text-blue-600 ${
                          xpAnimation ? "animate-pulse scale-110" : ""
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>2,450 XP</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-blue-800">
                        <span>Level Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-blue-200 text-blue-800 hover:bg-blue-300">
                        <Flame className="h-3 w-3 mr-1 text-orange-500" />
                        <span>12 Day Streak</span>
                      </Badge>
                      <Badge variant="outline" className="bg-blue-200 text-blue-800 hover:bg-blue-300">
                        <Award className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>Problem Solver</span>
                      </Badge>
                      <Badge variant="outline" className="bg-blue-200 text-blue-800 hover:bg-blue-300">
                        <Brain className="h-3 w-3 mr-1 text-purple-500" />
                        <span>Critical Thinker</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Challenge Card */}
            <Card className="border-2 border-yellow-200 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-yellow-900">Today's Challenge</CardTitle>
                  <Badge className="bg-yellow-400 text-white hover:bg-yellow-500">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    <span>+150 XP</span>
                  </Badge>
                </div>
                <CardDescription className="text-yellow-800">CEO Decision Making</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-900">
                  "You are the CEO of a struggling company. You have two options: Lay off employees or raise prices.
                  What would you do and why?"
                </p>
                <div className="mt-4 flex items-center text-xs text-yellow-700">
                  <Brain className="h-3 w-3 mr-1" />
                  <span>Uses Strategic Thinking & Second-Order Thinking</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-1 bg-yellow-500 text-white hover:bg-yellow-600">
                  <span>Solve Challenge</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Top Thinkers (Pink card, but gold/silver/bronze badges) */}
            <Card className="border-2 border-pink-200 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-pink-900">Top Thinkers</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1 text-pink-800">
                    <span>View Full Leaderboard</span>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 1st Place (Gold) */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300/20">
                      <Trophy className="h-4 w-4 text-yellow-600" />
                    </div>
                    <Avatar className="h-9 w-9 border border-yellow-600">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-pink-900">Jessica Davis</div>
                      <div className="text-xs text-pink-700">Level 12 • 5,230 XP</div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-300/10 text-yellow-600">
                      1st
                    </Badge>
                  </div>

                  {/* 2nd Place (Silver) */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300/20">
                      <Trophy className="h-4 w-4 text-gray-600" />
                    </div>
                    <Avatar className="h-9 w-9 border border-gray-600">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-pink-900">Michael Kim</div>
                      <div className="text-xs text-pink-700">Level 11 • 4,890 XP</div>
                    </div>
                    <Badge variant="outline" className="bg-gray-300/10 text-gray-600">
                      2nd
                    </Badge>
                  </div>

                  {/* 3rd Place (Bronze) */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300/20">
                      <Trophy className="h-4 w-4 text-amber-600" />
                    </div>
                    <Avatar className="h-9 w-9 border border-amber-600">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-pink-900">Sarah Lee</div>
                      <div className="text-xs text-pink-700">Level 10 • 4,560 XP</div>
                    </div>
                    <Badge variant="outline" className="bg-amber-300/10 text-amber-600">
                      3rd
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lower section: Recommended & Active Events side by side on large screens */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
            {/* Recommended For You */}
            <Card className="border-2 border-purple-200 shadow-lg flex flex-col bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-purple-900">Recommended For You</CardTitle>
                  <Badge variant="outline" className="bg-purple-300 text-purple-900">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>AI Personalized</span>
                  </Badge>
                </div>
                <CardDescription className="text-purple-800">
                  Based on your thinking style and progress
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <Tabs defaultValue="exercises" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="exercises">Exercises</TabsTrigger>
                    <TabsTrigger value="models">Mental Models</TabsTrigger>
                    <TabsTrigger value="games">Games</TabsTrigger>
                  </TabsList>

                  {/* Exercises Tab */}
                  <TabsContent value="exercises" className="mt-4 space-y-4">
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Lightbulb className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Lateral Thinking Puzzle
                        </h4>
                        <p className="text-sm text-purple-800">
                          Solve a mystery using creative thinking
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">+100 XP</Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <TrendingUp className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Business Case Analysis
                        </h4>
                        <p className="text-sm text-purple-800">
                          Apply second-order thinking to a business problem
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">+120 XP</Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Lightbulb className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Creative Brain Teaser
                        </h4>
                        <p className="text-sm text-purple-800">
                          Solve a puzzle that challenges your creativity
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">+110 XP</Badge>
                    </div>
                  </TabsContent>

                  {/* Models Tab */}
                  <TabsContent value="models" className="mt-4 space-y-4">
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Brain className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          First-Principles Thinking
                        </h4>
                        <p className="text-sm text-purple-800">
                          Break down complex problems to their fundamentals
                        </p>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-900">
                        Unlock
                      </Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Brain className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Bayesian Reasoning
                        </h4>
                        <p className="text-sm text-purple-800">
                          Update beliefs based on new evidence
                        </p>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-900">
                        Unlock
                      </Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Brain className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Systems Thinking
                        </h4>
                        <p className="text-sm text-purple-800">
                          Understand complex systems by analyzing interconnections
                        </p>
                      </div>
                      <Badge variant="outline" className="border-purple-300 text-purple-900">
                        Unlock
                      </Badge>
                    </div>
                  </TabsContent>

                  {/* Games Tab */}
                  <TabsContent value="games" className="mt-4 space-y-4">
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Gamepad2 className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Strategic Decision Simulator
                        </h4>
                        <p className="text-sm text-purple-800">
                          Make decisions and see their consequences unfold
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">Play</Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Gamepad2 className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Logic Escape Room
                        </h4>
                        <p className="text-sm text-purple-800">
                          Solve puzzles to escape a virtual room
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">Play</Badge>
                    </div>
                    <div className="group flex items-center gap-4 rounded-lg border p-3 hover:bg-purple-200 transition-colors cursor-pointer">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                        <Gamepad2 className="h-6 w-6 text-purple-900" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium group-hover:text-purple-900 transition-colors">
                          Puzzle Adventure
                        </h4>
                        <p className="text-sm text-purple-800">
                          Embark on an interactive puzzle adventure
                        </p>
                      </div>
                      <Badge className="bg-purple-300 text-purple-900">Play</Badge>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Active Events & Tournaments */}
            <Card className="border-2 border-teal-200 shadow-lg flex flex-col bg-gradient-to-br from-teal-50 to-teal-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-teal-900">Active Events & Tournaments</CardTitle>
                <CardDescription className="text-teal-800">
                  Join these events to earn bonus XP and special badges
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col gap-4">
                  {/* Weekly Think Like a Genius Contest */}
                  <div className="group relative overflow-hidden rounded-lg border p-5 hover:border-teal-400 transition-colors">
                    <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-teal-200/50" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-teal-600" />
                        <h3 className="font-semibold text-teal-900">Weekly Think Like a Genius Contest</h3>
                      </div>
                      <p className="mt-2 text-sm text-teal-800">
                        Solve a series of challenging problems created by top thinkers.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge variant="outline" className="bg-teal-200 text-teal-900">
                          <Lightbulb className="h-3 w-3 mr-1 text-yellow-500" />
                          <span>500 XP Prize</span>
                        </Badge>
                        <span className="text-xs text-teal-700">Ends in 2 days</span>
                      </div>
                      <Button className="mt-3 w-full bg-teal-500 text-white hover:bg-teal-600" variant="outline">
                        Join Contest
                      </Button>
                    </div>
                  </div>
                  {/* Team Problem-Solving Challenge */}
                  <div className="group relative overflow-hidden rounded-lg border p-5 hover:border-teal-400 transition-colors">
                    <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-teal-200/50" />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-teal-600" />
                        <h3 className="font-semibold text-teal-900">Team Problem-Solving Challenge</h3>
                      </div>
                      <p className="mt-2 text-sm text-teal-800">
                        Form a team and collaborate to solve complex real-world problems.
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge variant="outline" className="bg-teal-200 text-teal-900">
                          <Award className="h-3 w-3 mr-1 text-purple-500" />
                          <span>Team Badge</span>
                        </Badge>
                        <span className="text-xs text-teal-700">Starts in 3 days</span>
                      </div>
                      <Button className="mt-3 w-full bg-teal-500 text-white hover:bg-teal-600" variant="outline">
                        Register Team
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
