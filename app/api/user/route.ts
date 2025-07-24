import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        settings: true,
        repositories: {
          include: {
            _count: {
              select: { deadCode: true, scans: true }
            }
          }
        },
        _count: {
          select: { scans: true }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 POST /api/user called')
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      console.log('❌ No session or user ID')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('✅ User authenticated:', session.user.id)

    const body = await request.json()
    const { email, name, image } = body

    console.log('📝 Creating/updating user:', { id: session.user.id, email, name })

    // Make sure we have a valid email
    if (!email) {
      console.log('❌ No email provided')
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // For now, let's just return a mock user to test if the API route is working
    const mockUser = {
      id: session.user.id,
      email,
      name,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
      settings: {
        id: 'mock-settings-id',
        deadCodeAlerts: true,
        weeklyReports: true,
        securityAlerts: true,
        prUpdates: false,
        autoCleanup: false,
        riskThreshold: 'medium',
        scanFrequency: 'daily'
      }
    }

    console.log('✅ Returning mock user:', mockUser.id)
    
    return NextResponse.json(mockUser)

    // TODO: Uncomment this when database is working
    /*
    // Create or update the user
    const user = await prisma.user.upsert({
      where: { id: session.user.id },
      update: {
        email,
        name,
        image,
      },
      create: {
        id: session.user.id,
        email,
        name,
        image,
        // Create default user settings when creating a new user
        settings: {
          create: {
            deadCodeAlerts: true,
            weeklyReports: true,
            securityAlerts: true,
            prUpdates: false,
            autoCleanup: false,
            riskThreshold: 'medium',
            scanFrequency: 'daily'
          }
        }
      },
      include: {
        settings: true
      }
    })

    console.log('User created/updated successfully:', user.id)
    
    return NextResponse.json(user)
    */
  } catch (error) {
    console.error('❌ Error in POST /api/user:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}