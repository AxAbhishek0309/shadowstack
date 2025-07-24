import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock settings data
    const mockSettings = {
      id: 'mock-settings-id',
      userId: session.user.id,
      deadCodeAlerts: true,
      weeklyReports: true,
      securityAlerts: true,
      prUpdates: false,
      autoCleanup: false,
      riskThreshold: 'medium',
      excludePatterns: null,
      scanFrequency: 'daily',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json(mockSettings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      deadCodeAlerts,
      weeklyReports,
      securityAlerts,
      prUpdates,
      autoCleanup,
      riskThreshold,
      excludePatterns,
      scanFrequency
    } = body

    // Mock updated settings (no database persistence)
    const mockSettings = {
      id: 'mock-settings-id',
      userId: session.user.id,
      deadCodeAlerts: deadCodeAlerts ?? true,
      weeklyReports: weeklyReports ?? true,
      securityAlerts: securityAlerts ?? true,
      prUpdates: prUpdates ?? false,
      autoCleanup: autoCleanup ?? false,
      riskThreshold: riskThreshold ?? 'medium',
      excludePatterns: excludePatterns ?? null,
      scanFrequency: scanFrequency ?? 'daily',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json(mockSettings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}