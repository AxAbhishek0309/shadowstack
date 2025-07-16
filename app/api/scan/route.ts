import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

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
    const { repositoryId } = body

    // Check if repository belongs to user
    const repository = await prisma.repository.findFirst({
      where: { 
        id: repositoryId,
        userId: user.id 
      }
    })

    if (!repository) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 })
    }

    // Create new scan
    const scan = await prisma.scan.create({
      data: {
        userId: user.id,
        repositoryId,
        status: 'running'
      }
    })

    // Simulate scan process (in real app, this would be a background job)
    setTimeout(async () => {
      try {
        // Mock scan results
        const mockDeadCode = [
          {
            filePath: 'src/components/OldModal.tsx',
            fileName: 'OldModal.tsx',
            fileSize: '2.3kb',
            unusedPercent: 95,
            lastUsed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 3 months ago
            riskLevel: 'low',
            functions: JSON.stringify(['handleClose', 'validateInput']),
            variables: JSON.stringify(['isVisible', 'modalRef']),
            imports: JSON.stringify(['useState', 'useEffect'])
          },
          {
            filePath: 'src/utils/deprecatedHelpers.js',
            fileName: 'deprecatedHelpers.js',
            fileSize: '1.8kb',
            unusedPercent: 87,
            lastUsed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 2 months ago
            riskLevel: 'medium',
            functions: JSON.stringify(['formatDate', 'parseQuery']),
            variables: JSON.stringify(['API_BASE_URL']),
            imports: JSON.stringify(['moment', 'lodash'])
          }
        ]

        // Create dead code entries
        await prisma.deadCode.createMany({
          data: mockDeadCode.map(item => ({
            ...item,
            repositoryId,
            scanId: scan.id
          }))
        })

        // Update scan status
        await prisma.scan.update({
          where: { id: scan.id },
          data: {
            status: 'completed',
            completedAt: new Date(),
            totalFiles: 150,
            deadFiles: mockDeadCode.length,
            coverage: 87.3,
            savings: '4.1kb',
            riskLevel: 'low'
          }
        })

        // Update repository last scan
        await prisma.repository.update({
          where: { id: repositoryId },
          data: { lastScanAt: new Date() }
        })

      } catch (error) {
        console.error('Error completing scan:', error)
        await prisma.scan.update({
          where: { id: scan.id },
          data: {
            status: 'failed',
            completedAt: new Date(),
            error: 'Scan failed'
          }
        })
      }
    }, 5000) // Complete scan after 5 seconds

    return NextResponse.json(scan)
  } catch (error) {
    console.error('Error starting scan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    const scans = await prisma.scan.findMany({
      where: { userId: user.id },
      include: {
        repository: true,
        deadCode: true
      },
      orderBy: { startedAt: 'desc' },
      take: 10
    })

    return NextResponse.json(scans)
  } catch (error) {
    console.error('Error fetching scans:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}