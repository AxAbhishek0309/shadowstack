import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock user data
    const mockUser = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
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
      },
      repositories: [
        {
          id: '1',
          name: 'my-awesome-app',
          fullName: 'username/my-awesome-app',
          description: 'A full-stack web application',
          language: 'TypeScript',
          stars: 42,
          private: false,
          _count: { deadCode: 5, scans: 3 }
        },
        {
          id: '2',
          name: 'api-service',
          fullName: 'username/api-service',
          description: 'RESTful API service',
          language: 'JavaScript',
          stars: 18,
          private: true,
          _count: { deadCode: 2, scans: 1 }
        }
      ],
      _count: { scans: 4 }
    }

    return NextResponse.json(mockUser)
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

    console.log('📝 User sync request:', { id: session.user.id, email, name })

    // Make sure we have a valid email
    if (!email) {
      console.log('❌ No email provided')
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Return mock user data (no database persistence)
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
  } catch (error) {
    console.error('❌ Error in POST /api/user:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}