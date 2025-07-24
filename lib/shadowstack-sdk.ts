/**
 * ShadowStack SDK
 * 
 * This SDK tracks code usage in production applications and sends analytics
 * back to the ShadowStack service for dead code detection.
 */

export interface UsageEvent {
  type: 'function' | 'component' | 'import' | 'variable';
  name: string;
  file: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface ShadowStackConfig {
  apiKey: string;
  projectId: string;
  endpoint?: string;
  sampleRate?: number; // 0-1, percentage of events to track
  debug?: boolean;
}

class ShadowStackTracker {
  private config: ShadowStackConfig;
  private queue: UsageEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;
  private isEnabled: boolean = true;

  constructor(config: ShadowStackConfig) {
    this.config = {
      endpoint: 'https://api.shadowstack.dev/v1/track',
      sampleRate: 0.1, // Default to 10% sampling
      debug: false,
      ...config
    };

    // Initialize flush interval
    this.flushInterval = setInterval(() => this.flush(), 60000); // Flush every minute

    // Handle page unload to save remaining events
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
    }

    if (this.config.debug) {
      console.log('[ShadowStack] Initialized with config:', this.config);
    }
  }

  /**
   * Track a function call
   */
  trackFunction(name: string, file: string, metadata?: Record<string, any>): void {
    this.track({
      type: 'function',
      name,
      file,
      timestamp: Date.now(),
      metadata
    });
  }

  /**
   * Track a component render
   */
  trackComponent(name: string, file: string, metadata?: Record<string, any>): void {
    this.track({
      type: 'component',
      name,
      file,
      timestamp: Date.now(),
      metadata
    });
  }

  /**
   * Track an import usage
   */
  trackImport(name: string, file: string, metadata?: Record<string, any>): void {
    this.track({
      type: 'import',
      name,
      file,
      timestamp: Date.now(),
      metadata
    });
  }

  /**
   * Track a variable access
   */
  trackVariable(name: string, file: string, metadata?: Record<string, any>): void {
    this.track({
      type: 'variable',
      name,
      file,
      timestamp: Date.now(),
      metadata
    });
  }

  /**
   * Generic track method
   */
  private track(event: UsageEvent): void {
    if (!this.isEnabled) return;
    
    // Apply sampling
    if (Math.random() > (this.config.sampleRate || 1)) return;
    
    this.queue.push(event);
    
    // Auto-flush if queue gets too large
    if (this.queue.length >= 100) {
      this.flush();
    }
    
    if (this.config.debug) {
      console.log('[ShadowStack] Tracked:', event);
    }
  }

  /**
   * Flush events to the server
   */
  async flush(): Promise<void> {
    if (this.queue.length === 0) return;
    
    const events = [...this.queue];
    this.queue = [];
    
    try {
      const response = await fetch(this.config.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
        },
        body: JSON.stringify({
          projectId: this.config.projectId,
          events,
          timestamp: Date.now(),
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (this.config.debug) {
        console.log(`[ShadowStack] Successfully sent ${events.length} events`);
      }
    } catch (error) {
      if (this.config.debug) {
        console.error('[ShadowStack] Error sending events:', error);
      }
      
      // Put events back in queue for retry
      this.queue = [...events, ...this.queue];
    }
  }

  /**
   * Disable tracking
   */
  disable(): void {
    this.isEnabled = false;
    if (this.config.debug) {
      console.log('[ShadowStack] Tracking disabled');
    }
  }

  /**
   * Enable tracking
   */
  enable(): void {
    this.isEnabled = true;
    if (this.config.debug) {
      console.log('[ShadowStack] Tracking enabled');
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
    
    this.flush();
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', () => this.flush());
    }
  }
}

// Create React HOC for component tracking
export function withTracking<P>(
  Component: React.ComponentType<P>,
  options: { name?: string; file: string }
): React.FC<P> {
  const displayName = options.name || Component.displayName || Component.name || 'Component';
  
  const TrackedComponent: React.FC<P> = (props) => {
    // Track component render
    shadowStack.trackComponent(displayName, options.file);
    
    return <Component {...props} />;
  };
  
  TrackedComponent.displayName = `Tracked(${displayName})`;
  
  return TrackedComponent;
}

// Create function wrapper for tracking function calls
export function trackFunction<T extends (...args: any[]) => any>(
  fn: T,
  options: { name?: string; file: string }
): T {
  const fnName = options.name || fn.name || 'anonymous';
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    shadowStack.trackFunction(fnName, options.file);
    return fn(...args);
  }) as T;
}

// Create singleton instance
export const shadowStack = new ShadowStackTracker({
  apiKey: process.env.NEXT_PUBLIC_SHADOWSTACK_API_KEY || '',
  projectId: process.env.NEXT_PUBLIC_SHADOWSTACK_PROJECT_ID || '',
  debug: process.env.NODE_ENV === 'development',
});

export default shadowStack;