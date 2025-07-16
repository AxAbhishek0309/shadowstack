"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  BarChart3,
  Code2,
  Github,
  Map,
  FileText,
  Settings,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Trash2,
  GitPullRequest,
  Zap,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react"

// Add Clerk imports at the top
import { UserButton } from "@clerk/nextjs"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const deadCodeFiles = [
    { name: "components/OldModal.tsx", unused: 95, size: "2.3kb", lastUsed: "3 months ago" },
    { name: "utils/deprecatedHelpers.js", unused: 87, size: "1.8kb", lastUsed: "2 months ago" },
    { name: "pages/legacy/dashboard.tsx", unused: 78, size: "4.1kb", lastUsed: "1 month ago" },
    { name: "hooks/useOldApi.ts", unused: 92, size: "1.2kb", lastUsed: "4 months ago" },
  ]

  const suggestions = [
    { file: "components/Button.tsx", action: "Remove unused props", impact: "Low risk" },
    { file: "utils/formatters.js", action: "Delete unused functions", impact: "Safe" },
    { file: "types/legacy.ts", action: "Remove deprecated types", impact: "Medium risk" },
  ]

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl border-r border-orange-500/20 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-orange-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              ShadowStack
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { icon: BarChart3, label: "Overview", active: true },
            { icon: Trash2, label: "Dead Code", badge: "23" },
            { icon: Github, label: "GitHub" },
            { icon: Map, label: "Heatmap" },
            { icon: FileText, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start text-left hover:bg-orange-500/10 hover:text-orange-400 transition-all duration-200 ${
                item.active ? "bg-orange-500/20 text-orange-400 border-r-2 border-orange-500" : "text-gray-300"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.badge && <Badge className="ml-auto bg-orange-500 text-white text-xs">{item.badge}</Badge>}
            </Button>
          ))}
        </nav>

        {/* AI Assistant Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <Button className="w-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 backdrop-blur-sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Assistant
            <Sparkles className="w-4 h-4 ml-auto" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="glass-card border-b border-orange-500/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-400 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search files, functions..."
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 w-64 corner-glow"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="text-gray-400 hover:text-white corner-glow"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative corner-glow">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
              </Button>

              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-orange-500/30 corner-glow",
                  },
                }}
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                title: "Dead Code Found",
                value: "23 files",
                change: "-12%",
                icon: TrendingDown,
                color: "text-green-400",
              },
              { title: "Code Coverage", value: "87.3%", change: "+5.2%", icon: BarChart3, color: "text-orange-400" },
              { title: "Cleanup Savings", value: "2.1MB", change: "+890KB", icon: Zap, color: "text-blue-400" },
              { title: "Risk Level", value: "Low", change: "Stable", icon: AlertTriangle, color: "text-green-400" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="glass-card corner-glow card-realistic p-6 hover:border-orange-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg flex items-center justify-center corner-glow">
                    <stat.icon className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Code Heatmap */}
            <Card className="lg:col-span-2 glass-card corner-glow card-realistic">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Code Usage Heatmap</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    3D View
                  </Button>
                </div>

                <div className="grid grid-cols-12 gap-1 mb-4">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded transition-all duration-500 hover:scale-110 cursor-pointer ${
                        Math.random() > 0.8
                          ? "bg-gradient-to-t from-orange-600 to-orange-400 shadow-lg shadow-orange-500/50"
                          : Math.random() > 0.6
                            ? "bg-gradient-to-t from-orange-800 to-orange-600 shadow-md shadow-orange-600/30"
                            : Math.random() > 0.3
                              ? "bg-gradient-to-t from-gray-700 to-gray-600"
                              : "bg-gray-800 border border-gray-700"
                      }`}
                      style={{
                        animationDelay: `${i * 10}ms`,
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded mr-2 shadow-sm shadow-orange-500/50"></div>
                      High Usage
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-orange-700 rounded mr-2"></div>
                      Medium Usage
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-gray-700 rounded mr-2"></div>
                      Low Usage
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-gray-800 border border-gray-600 rounded mr-2"></div>
                      Dead Code
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Dead Code Files */}
            <Card className="glass-card corner-glow card-realistic">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Top Dead Code</h3>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{deadCodeFiles.length} files</Badge>
                </div>

                <div className="space-y-4">
                  {deadCodeFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-orange-500/30 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm truncate">{file.name}</span>
                        <Badge className="bg-red-500/20 text-red-400 text-xs">{file.unused}%</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{file.size}</span>
                        <span>{file.lastUsed}</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${file.unused}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Auto-clean Suggestions */}
          <Card className="glass-card corner-glow card-realistic">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Auto-clean Suggestions</h3>
                <Button className="btn-premium corner-glow">
                  <GitPullRequest className="w-4 h-4 mr-2" />
                  Create PR
                </Button>
              </div>

              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-orange-500/30 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">{suggestion.file}</p>
                          <p className="text-gray-400 text-sm">{suggestion.action}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={`text-xs ${
                          suggestion.impact === "Safe"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : suggestion.impact === "Low risk"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }`}
                      >
                        {suggestion.impact}
                      </Badge>
                      <Switch />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
