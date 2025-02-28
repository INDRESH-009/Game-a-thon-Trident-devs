"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Home,
  Lightbulb,
  Gamepad2,
  Trophy,
  GraduationCapIcon as Graduation,
  Users,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-4 w-4 mr-2" /> },
    { href: "/daily-challenge", label: "Daily Challenge", icon: <Lightbulb className="h-4 w-4 mr-2" /> },
    { href: "/games", label: "Games", icon: <Gamepad2 className="h-4 w-4 mr-2" /> },
    { href: "/learn", label: "Learn", icon: <Brain className="h-4 w-4 mr-2" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-4 w-4 mr-2" /> },
    { href: "/events", label: "Events", icon: <Graduation className="h-4 w-4 mr-2" /> },
    { href: "/podcasts", label: "Podcasts", icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-10 border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>ThinkMaster AI</span>
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link, idx) => (
            <Button
              asChild
              variant="ghost"
              className=" hover:text-primary"
              size="sm"
              key={idx}
            >
              <Link href={link.href}>
                <div className="flex items-center">
                  {link.icon}
                  {link.label}
                </div>
              </Link>
            </Button>
          ))}
        </nav>

        {/* Right: Notifications & Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 flex">
          <div className="w-64 bg-background p-4 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Brain className="h-6 w-6 text-primary" />
                <span>ThinkMaster AI</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <Button
                  asChild
                  variant="ghost"
                  className="text-muted-foreground hover:text-primary"
                  size="sm"
                  key={idx}
                >
                  <Link href={link.href} onClick={() => setSidebarOpen(false)}>
                    <div className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </div>
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="mt-6 border-t pt-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          {/* Clickable overlay to close the sidebar */}
          <div className="flex-grow" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
}