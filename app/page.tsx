"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Play, Code2, GitBranch, ArrowRight, Sparkles, Shield, Target } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-orange-600 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-orange-300 rounded-full animate-pulse opacity-50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 glass-card">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25 corner-glow">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            ShadowStack
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-orange-400 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-orange-400 transition-colors">
            Pricing
          </a>
          <a href="#docs" className="text-gray-300 hover:text-orange-400 transition-colors">
            Docs
          </a>
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent glass-card"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="btn-premium text-white">Get Started</Button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge className="mb-6 bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20 transition-colors">
            <Sparkles className="w-3 h-3 mr-1" />
            Now with AI-powered suggestions
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Dead Code
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Before It Finds You
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            ShadowStack maps real code usage from production & GitHub to eliminate waste and broken logic.
            <span className="text-orange-400"> Ship faster, debug less.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="btn-premium text-white px-8 py-4 text-lg font-semibold corner-glow transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Play className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                />
              </Button>
            </SignUpButton>

            <Link href="/connect/github">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 px-8 py-4 text-lg glass-card corner-glow bg-transparent"
              >
                <Github className="w-5 h-5 mr-2" />
                Try with GitHub
              </Button>
            </Link>
          </div>

          {/* 3D Heatmap Visual */}
          <div className="relative max-w-4xl mx-auto">
            <Card className="glass-card corner-glow card-realistic overflow-hidden">
              <div className="p-8">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded transition-all duration-1000 corner-glow ${
                        Math.random() > 0.7
                          ? "bg-gradient-to-t from-orange-600 to-orange-400 shadow-lg shadow-orange-500/50 animate-pulse"
                          : Math.random() > 0.4
                            ? "bg-gradient-to-t from-orange-800 to-orange-600 shadow-md shadow-orange-600/30"
                            : "bg-gray-800 border border-gray-700"
                      }`}
                      style={{
                        animationDelay: `${i * 50}ms`,
                        transform: Math.random() > 0.8 ? "translateY(-4px)" : "none",
                        boxShadow: Math.random() > 0.7 ? "0 0 15px rgba(255, 107, 0, 0.4)" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-orange-500">ShadowStack</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card corner-glow card-realistic p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Real-time Detection</h3>
              <p className="text-gray-300">
                Monitor production usage patterns and identify unused code paths instantly.
              </p>
            </Card>

            <Card className="glass-card corner-glow card-realistic p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">GitHub Integration</h3>
              <p className="text-gray-300">
                Seamlessly connect with your repositories for automated cleanup suggestions.
              </p>
            </Card>

            <Card className="glass-card corner-glow card-realistic p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-orange-500/25">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-400">Safe Cleanup</h3>
              <p className="text-gray-300">AI-powered analysis ensures safe removal without breaking dependencies.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-orange-500/20 py-12 px-6 backdrop-blur-sm bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-orange-400">ShadowStack</span>
          </div>
          <p className="text-gray-400">© 2024 ShadowStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
