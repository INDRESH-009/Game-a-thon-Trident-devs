"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Brain, Lightbulb, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Home Page Component
export default function Home() {
  const router = useRouter();

  // For mounting animations only after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Initialize particles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Prevent rendering until mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#a78bfa" },
            links: {
              color: "#a78bfa",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              speed: 1,
            },
            number: {
              density: { enable: true, area: 800 },
              value: 80,
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* Hero Section */}
      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        {/* Text Content */}
        <div className="text-center lg:text-left md:ml-12">
          {/* Small Badge */}
          <div className="flex justify-center lg:justify-start">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2 rounded-full bg-purple-900/50 px-4 py-2 text-sm font-medium text-purple-100 backdrop-blur-sm"
            >
              <Zap className="h-4 w-4 text-purple-200" />
              <span>Boost your critical thinking skills</span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            <span className="block">Think Smarter,</span>
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Decide Better
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-6 max-w-lg text-xl text-gray-300 lg:mx-0"
          >
            ThinkMaster AI is your personal coach for developing critical thinking, problem-solving, 
            and decision-making skills through gamified challenges.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            {/* "Get Started" -> /auth/signup */}
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
              onClick={() => router.push("/auth/signup")}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 -z-10 translate-y-full rounded-full bg-gradient-to-r from-purple-700 to-cyan-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
            </Button>

            {/* "Login" -> /auth/login */}
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-purple-300/20 bg-white/5 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          </motion.div>
        </div>

        {/* Floating Icons + Rotating Brain */}
        <div className="mt-12 hidden lg:mt-0 lg:block lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto h-[450px] w-[450px]">
              <FloatingIcons />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full bg-gradient-to-r from-purple-600/30 to-cyan-500/30 blur-3xl" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 50,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Brain className="h-32 w-32 text-purple-300/80" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-8 p-6 text-white/60"
      >
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <span>Gamified Learning</span>
        </div>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          <span>AI-Powered Coaching</span>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          <span>Mental Models</span>
        </div>
      </motion.div>
    </main>
  );
}

// Floating icons for the hero illustration
function FloatingIcons() {
  const icons = [
    { icon: "💡", delay: 0, x: -120, y: -100 },
    { icon: "🧠", delay: 2, x: 120, y: -80 },
    { icon: "⚡", delay: 1, x: 140, y: 80 },
    { icon: "🎯", delay: 3, x: -100, y: 100 },
    { icon: "🔍", delay: 2.5, x: 0, y: -150 },
    { icon: "🏆", delay: 1.5, x: -150, y: 0 },
  ];

  return (
    <>
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 + item.delay * 0.2 }}
          className="absolute left-1/2 top-1/2 text-2xl"
          style={{ marginLeft: item.x, marginTop: item.y }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
