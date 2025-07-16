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
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const repositories = await prisma.repository.findMany({
      where: { userId: user.id },
      include: {
        _count: {
          select: { deadCode: true, scans: true }
        },
        scans: {
          orderBy: { startedAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(repositories)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
    const { githubId, name, fullName, description, language, private: isPrivate, stars, url } = body

    const repository = await prisma.repository.create({
      data: {
        userId: user.id,
        githubId,
        name,
        fullName,
        description,
        language,
        private: isPrivate,
        stars,
        url,
      }
    })

    return NextResponse.json(repository)
  } catch (error) {
    console.error('Error creating repository:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}