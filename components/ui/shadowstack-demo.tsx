import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useShadowStack, withShadowStack } from '@/hooks/use-shadowstack';
import { trackFunction } from '@/lib/shadowstack-sdk';

// Example of a utility function tracked with ShadowStack
const formatDate = trackFunction((date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}, { name: 'formatDate', file: 'components/ui/shadowstack-demo.tsx' });

// Example of a component using the useShadowStack hook
const ShadowStackDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  // Initialize ShadowStack tracking
  const { trackFunction, trackEvent } = useShadowStack(
    'ShadowStackDemo',
    'components/ui/shadowstack-demo.tsx',
    { trackRender: true, trackEvents: true }
  );
  
  // Track button click
  const handleIncrement = useCallback(() => {
    trackFunction('handleIncrement', { countBefore: count });
    setCount(prev => prev + 1);
  }, [count, trackFunction]);
  
  // Track toggle details
  const handleToggleDetails = useCallback(() => {
    trackEvent('toggleDetails', { showDetailsBefore: showDetails });
    setShowDetails(prev => !prev);
  }, [showDetails, trackEvent]);
  
  // Use the tracked utility function
  const formattedDate = formatDate(new Date());
  
  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ShadowStack Demo</h2>
        <Badge variant="outline">Tracked Component</Badge>
      </div>
      
      <p className="mb-4">
        This component demonstrates how to use ShadowStack to track code usage.
        Every interaction is tracked to identify dead code.
      </p>
      
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={handleIncrement}>
          Increment ({count})
        </Button>
        
        <Button variant="outline" onClick={handleToggleDetails}>
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>
      
      {showDetails && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h3 className="font-medium mb-2">Component Details</h3>
          <p>Current date: {formattedDate}</p>
          <p>Render count: {count + 1}</p>
          <p className="text-sm text-gray-500 mt-2">
            This section is tracked and will not be flagged as dead code.
          </p>
        </div>
      )}
      
      {/* This is dead code that will never be rendered */}
      {false && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded-md">
          <h3 className="font-medium mb-2">Dead Code Example</h3>
          <p>This section will never be rendered and should be detected as dead code.</p>
        </div>
      )}
    </Card>
  );
};

// Example of a component using the withShadowStack HOC
const TrackedFooter = withShadowStack(
  ({ copyright }: { copyright: string }) => (
    <footer className="text-center text-gray-500 text-sm mt-4">
      {copyright}
    </footer>
  ),
  {
    componentName: 'TrackedFooter',
    filePath: 'components/ui/shadowstack-demo.tsx',
    trackProps: true
  }
);

// Export the combined demo
export default function ShadowStackDemoWrapper() {
  return (
    <div className="space-y-4">
      <ShadowStackDemo />
      <TrackedFooter copyright="© 2025 ShadowStack" />
    </div>
  );
}