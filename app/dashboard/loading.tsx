"use client";

import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <Card className="glass-card corner-glow card-realistic p-8 w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-orange-500 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-orange-400 animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 rounded-full border-t-2 border-orange-300 animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
          <h2 className="text-xl font-semibold text-white">Loading Dashboard</h2>
          <p className="text-gray-400 text-center">
            Setting up your ShadowStack dashboard...
          </p>
        </div>
      </Card>
    </div>
  );
}