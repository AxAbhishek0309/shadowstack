import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const repositoryId = searchParams.get('repositoryId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where = {
      repository: { userId: user.id },
      isResolved: false,
      ...(repositoryId && { repositoryId })
    }

    const [deadCode, total] = await Promise.all([
      prisma.deadCode.findMany({
        where,
        include: {
          repository: true,
          scan: true
        },
        orderBy: { unusedPercent: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.deadCode.count({ where })
    ])

    return NextResponse.json({
      data: deadCode,
      total,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Error fetching dead code:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
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
    const { id, isResolved } = body

    // Verify ownership
    const deadCode = await prisma.deadCode.findFirst({
      where: {
        id,
        repository: { userId: user.id }
      }
    })

    if (!deadCode) {
      return NextResponse.json({ error: 'Dead code not found' }, { status: 404 })
    }

    const updated = await prisma.deadCode.update({
      where: { id },
      data: {
        isResolved,
        resolvedAt: isResolved ? new Date() : null
      }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating dead code:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}