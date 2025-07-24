"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function DashboardTest() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-orange-400">
            🎉 Dashboard Test - Working!
          </h1>
          <UserButton />
        </div>
        
        <Card className="glass-card corner-glow card-realistic p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation Test Successful</h2>
          <p className="text-gray-300 mb-4">
            If you can see this page, it means:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
            <li>✅ Authentication is working</li>
            <li>✅ Routing is working</li>
            <li>✅ No database dependency issues</li>
            <li>✅ No unnecessary API calls</li>
          </ul>
          
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button className="btn-premium">
                Go to Full Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-orange-500/50 text-orange-400">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}