import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { settings: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Create default settings if they don't exist
    if (!user.settings) {
      const settings = await prisma.userSettings.create({
        data: { userId: user.id }
      })
      return NextResponse.json(settings)
    }

    return NextResponse.json(user.settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
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

    const settings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      update: {
        deadCodeAlerts,
        weeklyReports,
        securityAlerts,
        prUpdates,
        autoCleanup,
        riskThreshold,
        excludePatterns,
        scanFrequency
      },
      create: {
        userId: user.id,
        deadCodeAlerts,
        weeklyReports,
        securityAlerts,
        prUpdates,
        autoCleanup,
        riskThreshold,
        excludePatterns,
        scanFrequency
      }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}