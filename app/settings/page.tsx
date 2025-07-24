"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession, signOut } from "next-auth/react"
import {
  Settings,
  Github,
  Bell,
  Shield,
  Code2,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Unlink,
  RefreshCw,
  ArrowLeft,
  Save,
  User,
  CreditCard,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const { data: session } = useSession()
  const user = session?.user
  const [notifications, setNotifications] = useState({
    deadCode: true,
    pullRequests: true,
    weeklyReports: false,
    securityAlerts: true,
  })

  const connectedRepos = [
    { name: "my-app", status: "active", lastScan: "2 hours ago" },
    { name: "api-service", status: "scanning", lastScan: "Scanning now..." },
    { name: "frontend-components", status: "active", lastScan: "1 day ago" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="glass-card border-b border-orange-500/20 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Settings</span>
            </div>
          </div>
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="border-orange-500/50 text-orange-400"
          >
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="github"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-card corner-glow card-realistic p-6">
              <h3 className="text-xl font-semibold mb-6 text-orange-400">Profile Information</h3>

              <div className="flex items-center space-x-6 mb-6">
                <Avatar className="w-20 h-20 border-2 border-orange-500/30">
                  <AvatarImage src={user?.image || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-orange-500 text-white text-xl">
                    {user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-medium text-white">{user?.name}</h4>
                  <p className="text-gray-400">{user?.email}</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Pro Plan</Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-300 mb-2 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue={user?.name?.split(' ')[0] || ""}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-300 mb-2 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue={user?.name?.split(' ').slice(1).join(' ') || ""}
                    className="bg-gray-800/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-300 mb-2 block">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="bg-gray-800/50 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <Button className="btn-premium corner-glow">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="github" className="space-y-6">
            <Card className="glass-card corner-glow card-realistic p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-orange-400">GitHub Integration</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <Github className="w-8 h-8 text-white" />
                    <div>
                      <p className="font-medium text-white">GitHub Account</p>
                      <p className="text-sm text-gray-400">Connected as @{user?.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Unlink className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-4 text-white">Connected Repositories</h4>
                  <div className="space-y-3">
                    {connectedRepos.map((repo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                      >
                        <div className="flex items-center space-x-3">
                          <Code2 className="w-5 h-5 text-orange-400" />
                          <div>
                            <p className="font-medium text-white">{repo.name}</p>
                            <p className="text-sm text-gray-400">Last scan: {repo.lastScan}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              repo.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            }
                          >
                            {repo.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <Link href="/connect/github">
                    <Button className="btn-premium corner-glow">
                      <Github className="w-4 h-4 mr-2" />
                      Add More Repositories
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card corner-glow card-realistic p-6">
              <h3 className="text-xl font-semibold mb-6 text-orange-400">Notification Preferences</h3>

              <div className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                      <p className="text-sm text-gray-400">
                        {key === "deadCode" && "Get notified when dead code is detected"}
                        {key === "pullRequests" && "Notifications for cleanup pull requests"}
                        {key === "weeklyReports" && "Weekly summary of code analysis"}
                        {key === "securityAlerts" && "Important security and privacy alerts"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="glass-card corner-glow card-realistic p-6">
              <h3 className="text-xl font-semibold mb-6 text-orange-400">Billing & Subscription</h3>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20 mb-6">
                <div className="flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-orange-400" />
                  <div>
                    <p className="font-medium text-white">Pro Plan</p>
                    <p className="text-sm text-gray-400">$29/month <span className="bullet"></span> Unlimited repositories</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Active</Badge>
              </div>
              <style jsx>{`
                .bullet {
                  display: inline-block;
                  width: 0.5em;
                  height: 0.5em;
                  background: currentColor;
                  border-radius: 50%;
                  vertical-align: middle;
                  margin: 0 0.4em;
                }
              `}</style>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Usage This Month</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Repositories scanned</span>
                      <span className="text-white">12 / Unlimited</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Dead code detected</span>
                      <span className="text-white">847 files</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">PRs created</span>
                      <span className="text-white">23</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">Next Billing</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Your next payment of $29.00 will be charged on January 15, 2024
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
                  >
                    Update Payment Method
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass-card corner-glow card-realistic p-6">
              <h3 className="text-xl font-semibold mb-6 text-orange-400">Security Settings</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-400">Your account is secured with 2FA</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800 bg-transparent"
                  >
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/30">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-orange-400" />
                    <div>
                      <p className="font-medium text-white">API Access</p>
                      <p className="text-sm text-gray-400">Manage API keys and access tokens</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                  >
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <div>
                      <p className="font-medium text-white">Delete Account</p>
                      <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
