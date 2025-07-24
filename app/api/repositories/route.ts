import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Mock repositories data
    const mockRepositories = [
      {
        id: '1',
        userId: session.user.id,
        githubId: 123456,
        name: 'my-awesome-app',
        fullName: 'username/my-awesome-app',
        description: 'A full-stack web application built with Next.js',
        language: 'TypeScript',
        private: false,
        stars: 42,
        url: 'https://github.com/username/my-awesome-app',
        isActive: true,
        lastScanAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { deadCode: 5, scans: 3 },
        scans: [{
          id: 'scan-1',
          status: 'completed',
          startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000)
        }]
      },
      {
        id: '2',
        userId: session.user.id,
        githubId: 789012,
        name: 'api-service',
        fullName: 'username/api-service',
        description: 'RESTful API service with Node.js and Express',
        language: 'JavaScript',
        private: true,
        stars: 18,
        url: 'https://github.com/username/api-service',
        isActive: true,
        lastScanAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { deadCode: 2, scans: 1 },
        scans: [{
          id: 'scan-2',
          status: 'completed',
          startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000 + 45000)
        }]
      },
      {
        id: '3',
        userId: session.user.id,
        githubId: 345678,
        name: 'mobile-app',
        fullName: 'username/mobile-app',
        description: 'React Native mobile application',
        language: 'TypeScript',
        private: false,
        stars: 7,
        url: 'https://github.com/username/mobile-app',
        isActive: true,
        lastScanAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        createdAt: new Date(),
        updatedAt: new Date(),
        _count: { deadCode: 1, scans: 2 },
        scans: [{
          id: 'scan-3',
          status: 'completed',
          startedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 60000)
        }]
      }
    ]

    return NextResponse.json(mockRepositories)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { githubId, name, fullName, description, language, private: isPrivate, stars, url } = body

    // Mock repository creation (no database persistence)
    const mockRepository = {
      id: `repo-${Date.now()}`,
      userId: session.user.id,
      githubId,
      name,
      fullName,
      description,
      language,
      private: isPrivate,
      stars,
      url,
      isActive: true,
      lastScanAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return NextResponse.json(mockRepository)
  } catch (error) {
    console.error('Error creating repository:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}