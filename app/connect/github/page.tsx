"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Github, 
  GitBranch, 
  Star, 
  Code2, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Search,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"

export default function GitHubConnect() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRepos, setSelectedRepos] = useState<string[]>([])

  // Mock repositories data
  const repositories = [
    {
      id: "1",
      name: "my-awesome-app",
      fullName: "username/my-awesome-app",
      description: "A full-stack web application built with Next.js",
      language: "TypeScript",
      stars: 42,
      private: false,
      lastPush: "2 hours ago"
    },
    {
      id: "2", 
      name: "api-service",
      fullName: "username/api-service",
      description: "RESTful API service with Node.js and Express",
      language: "JavaScript",
      stars: 18,
      private: true,
      lastPush: "1 day ago"
    },
    {
      id: "3",
      name: "mobile-app",
      fullName: "username/mobile-app",
      description: "React Native mobile application",
      language: "TypeScript",
      stars: 7,
      private: false,
      lastPush: "3 days ago"
    }
  ]

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate GitHub OAuth flow
    setTimeout(() => {
      setIsConnecting(false)
    }, 2000)
  }

  const toggleRepoSelection = (repoId: string) => {
    setSelectedRepos(prev => 
      prev.includes(repoId) 
        ? prev.filter(id => id !== repoId)
        : [...prev, repoId]
    )
  }

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="glass-card border-b border-orange-500/20 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                ShadowStack
              </span>
            </div>
          </div>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 border-2 border-orange-500/30 corner-glow",
              },
            }}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/25">
            <Github className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">Connect GitHub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect your GitHub repositories to start analyzing dead code and optimize your codebase
          </p>
        </div>

        {/* Connection Status */}
        <Card className="glass-card corner-glow card-realistic p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">GitHub Connected</h3>
                <p className="text-gray-400">Connected as @username</p>
              </div>
            </div>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="btn-premium"
            >
              {isConnecting ? "Reconnecting..." : "Reconnect"}
            </Button>
          </div>
        </Card>

        {/* Repository Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Select Repositories</h2>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
              {selectedRepos.length} selected
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 corner-glow"
            />
          </div>

          {/* Repository List */}
          <div className="grid gap-4">
            {filteredRepos.map((repo) => (
              <Card
                key={repo.id}
                className={`glass-card corner-glow card-realistic p-6 cursor-pointer transition-all duration-200 hover:border-orange-500/40 ${
                  selectedRepos.includes(repo.id) ? "border-orange-500/60 bg-orange-500/5" : ""
                }`}
                onClick={() => toggleRepoSelection(repo.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <GitBranch className="w-5 h-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-white">{repo.fullName}</h3>
                      {repo.private && (
                        <Badge className="bg-gray-700 text-gray-300 text-xs">Private</Badge>
                      )}
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        {repo.language}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{repo.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stars}
                      </span>
                      <span>Last push: {repo.lastPush}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://github.com/${repo.fullName}`, '_blank')
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedRepos.includes(repo.id)
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-600 hover:border-orange-500"
                    }`}>
                      {selectedRepos.includes(repo.id) && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <p className="text-gray-400">
              {selectedRepos.length} repositories selected for analysis
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
              >
                Save Selection
              </Button>
              <Link href="/dashboard">
                <Button className="btn-premium">
                  Start Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}