import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface UsageEvent {
  type: 'function' | 'component' | 'import' | 'variable';
  name: string;
  file: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface AnalyticsPayload {
  projectId: string;
  events: UsageEvent[];
  timestamp: number;
}

export async function POST(request: NextRequest) {
  try {
    // Get API key from headers
    const apiKey = request.headers.get('X-API-Key');
    
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key' }, { status: 401 });
    }
    
    // In a real implementation, validate the API key against the database
    // For now, we'll assume it's valid
    
    const body = await request.json() as AnalyticsPayload;
    const { projectId, events } = body;
    
    if (!projectId || !events || !Array.isArray(events)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    
    // Find the repository by projectId
    const repository = await prisma.repository.findFirst({
      where: { 
        // In a real implementation, we would have a projectId field
        // For now, we'll use the repository name as a proxy
        name: projectId
      }
    });
    
    if (!repository) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    // Process the events
    // In a real implementation, we would store these events in a database
    // For now, we'll just log them
    console.log(`Received ${events.length} events for project ${projectId}`);
    
    // Update last activity for any dead code that matches these events
    for (const event of events) {
      const { type, name, file } = event;
      
      // Find any dead code entries that match this event
      const deadCodeEntries = await prisma.deadCode.findMany({
        where: {
          repositoryId: repository.id,
          filePath: file,
          OR: [
            { functions: { contains: name } },
            { variables: { contains: name } },
            { imports: { contains: name } }
          ]
        }
      });
      
      // Update the last used date for each matching entry
      for (const entry of deadCodeEntries) {
        await prisma.deadCode.update({
          where: { id: entry.id },
          data: {
            lastUsed: new Date(),
            // If the code is being used, it's not dead anymore
            isResolved: true,
            resolvedAt: new Date()
          }
        });
      }
    }
    
    return NextResponse.json({ success: true, eventsProcessed: events.length });
  } catch (error) {
    console.error('Error processing analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}