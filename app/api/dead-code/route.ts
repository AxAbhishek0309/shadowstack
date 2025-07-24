import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const repositoryId = searchParams.get('repositoryId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Mock dead code data
    const mockDeadCode = [
      {
        id: 'dead-1',
        repositoryId: '1',
        scanId: 'scan-1',
        filePath: 'src/components/OldModal.tsx',
        fileName: 'OldModal.tsx',
        fileSize: '2.3kb',
        unusedPercent: 95,
        lastUsed: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        riskLevel: 'low',
        functions: JSON.stringify([
          { name: 'handleClose', lastUsed: '2023-04-15', callCount: 0 },
          { name: 'validateInput', lastUsed: '2023-05-22', callCount: 2 }
        ]),
        variables: JSON.stringify([
          { name: 'isVisible', lastUsed: '2023-04-15', references: 0 }
        ]),
        imports: JSON.stringify([
          { name: 'useState', used: false }
        ]),
        isResolved: false,
        resolvedAt: null,
        createdAt: new Date(),
        repository: {
          id: '1',
          name: 'my-awesome-app',
          fullName: 'username/my-awesome-app'
        },
        scan: {
          id: 'scan-1',
          status: 'completed'
        }
      },
      {
        id: 'dead-2',
        repositoryId: '1',
        scanId: 'scan-1',
        filePath: 'src/utils/deprecatedHelpers.js',
        fileName: 'deprecatedHelpers.js',
        fileSize: '1.8kb',
        unusedPercent: 87,
        lastUsed: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        riskLevel: 'medium',
        functions: JSON.stringify([
          { name: 'formatDate', lastUsed: '2023-05-10', callCount: 0 }
        ]),
        variables: JSON.stringify([
          { name: 'API_BASE_URL', lastUsed: null, references: 0 }
        ]),
        imports: JSON.stringify([
          { name: 'moment', used: false }
        ]),
        isResolved: false,
        resolvedAt: null,
        createdAt: new Date(),
        repository: {
          id: '1',
          name: 'my-awesome-app',
          fullName: 'username/my-awesome-app'
        },
        scan: {
          id: 'scan-1',
          status: 'completed'
        }
      }
    ]

    // Filter by repositoryId if provided
    const filteredData = repositoryId 
      ? mockDeadCode.filter(item => item.repositoryId === repositoryId)
      : mockDeadCode

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + limit)

    return NextResponse.json({
      data: paginatedData,
      total: filteredData.length,
      hasMore: offset + limit < filteredData.length
    })
  } catch (error) {
    console.error('Error fetching dead code:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, isResolved } = body

    // Mock update (no database persistence)
    const mockUpdated = {
      id,
      isResolved: isResolved ?? false,
      resolvedAt: isResolved ? new Date() : null,
      updatedAt: new Date()
    }

    return NextResponse.json(mockUpdated)
  } catch (error) {
    console.error('Error updating dead code:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}