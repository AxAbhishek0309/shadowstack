import { useEffect, useRef } from 'react';
import { shadowStack } from '@/lib/shadowstack-sdk';

/**
 * Hook to track component usage with ShadowStack
 * 
 * @param componentName - Name of the component to track
 * @param filePath - Path to the file containing the component
 * @param options - Additional tracking options
 */
export function useShadowStack(
  componentName: string,
  filePath: string,
  options?: {
    trackRender?: boolean;
    trackProps?: boolean;
    trackEvents?: boolean;
    metadata?: Record<string, any>;
  }
) {
  const {
    trackRender = true,
    trackProps = false,
    trackEvents = false,
    metadata = {}
  } = options || {};

  const renderCountRef = useRef(0);

  // Track component render
  useEffect(() => {
    if (trackRender) {
      renderCountRef.current += 1;
      shadowStack.trackComponent(componentName, filePath, {
        renderCount: renderCountRef.current,
        ...metadata
      });
    }
  }, [componentName, filePath, trackRender, metadata]);

  // Return tracking functions for manual usage
  return {
    trackFunction: (name: string, fnMetadata?: Record<string, any>) => {
      shadowStack.trackFunction(`${componentName}.${name}`, filePath, {
        ...metadata,
        ...fnMetadata
      });
    },
    trackEvent: (eventName: string, eventMetadata?: Record<string, any>) => {
      if (trackEvents) {
        shadowStack.trackFunction(`${componentName}.event.${eventName}`, filePath, {
          ...metadata,
          ...eventMetadata
        });
      }
    },
    trackImport: (importName: string, importMetadata?: Record<string, any>) => {
      shadowStack.trackImport(importName, filePath, {
        component: componentName,
        ...metadata,
        ...importMetadata
      });
    },
    trackVariable: (variableName: string, variableMetadata?: Record<string, any>) => {
      shadowStack.trackVariable(variableName, filePath, {
        component: componentName,
        ...metadata,
        ...variableMetadata
      });
    }
  };
}

/**
 * Higher-order component to track component usage
 * 
 * @param Component - Component to track
 * @param options - Tracking options
 */
export function withShadowStack<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    componentName?: string;
    filePath: string;
    trackProps?: boolean;
    trackRender?: boolean;
  }
) {
  const displayName = options.componentName || Component.displayName || Component.name || 'Component';
  
  const TrackedComponent = (props: P) => {
    const { trackFunction } = useShadowStack(displayName, options.filePath, {
      trackRender: options.trackRender,
      trackProps: options.trackProps,
      metadata: options.trackProps ? { props: Object.keys(props) } : undefined
    });
    
    // Track the render method
    useEffect(() => {
      trackFunction('render');
    }, [trackFunction]);
    
    return <Component {...props} />;
  };
  
  TrackedComponent.displayName = `ShadowStack(${displayName})`;
  
  return TrackedComponent;
}

export default useShadowStack;