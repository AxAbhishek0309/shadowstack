# ShadowStack: Find Dead Code Before It Finds You

ShadowStack is a powerful tool for identifying and eliminating dead code in your applications. By tracking real-world usage patterns from production and combining them with static analysis, ShadowStack helps you maintain a clean, efficient codebase.

## Features

- **Real-time Usage Tracking**: Monitor how your code is used in production
- **Dead Code Detection**: Identify unused functions, components, imports, and variables
- **Risk Assessment**: Evaluate the impact of removing dead code
- **GitHub Integration**: Connect your repositories for automated analysis
- **Dashboard**: Visualize code usage and dead code metrics

## Getting Started

### 1. Install the ShadowStack SDK

```bash
npm install @shadowstack/sdk
# or
yarn add @shadowstack/sdk
```

### 2. Configure the SDK

Create a `.env.local` file with your ShadowStack API key and project ID:

```
NEXT_PUBLIC_SHADOWSTACK_API_KEY="your_api_key"
NEXT_PUBLIC_SHADOWSTACK_PROJECT_ID="your_project_id"
```

### 3. Initialize the SDK

```typescript
// lib/shadowstack.ts
import { createShadowStack } from '@shadowstack/sdk';

export const shadowStack = createShadowStack({
  apiKey: process.env.NEXT_PUBLIC_SHADOWSTACK_API_KEY!,
  projectId: process.env.NEXT_PUBLIC_SHADOWSTACK_PROJECT_ID!,
  debug: process.env.NODE_ENV === 'development'
});

export default shadowStack;
```

## Usage

### Track React Components

#### Using the Hook

```tsx
import { useShadowStack } from '@shadowstack/sdk/react';

function MyComponent() {
  const { trackFunction, trackEvent } = useShadowStack(
    'MyComponent',
    'path/to/MyComponent.tsx'
  );
  
  const handleClick = () => {
    trackFunction('handleClick');
    // Your code here
  };
  
  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
```

#### Using the HOC

```tsx
import { withShadowStack } from '@shadowstack/sdk/react';

function MyComponent(props) {
  return <div>{props.children}</div>;
}

export default withShadowStack(MyComponent, {
  componentName: 'MyComponent',
  filePath: 'path/to/MyComponent.tsx'
});
```

### Track Functions

```typescript
import { trackFunction } from '@shadowstack/sdk';

export const myFunction = trackFunction(
  (arg1, arg2) => {
    // Your function code
    return result;
  },
  { name: 'myFunction', file: 'path/to/file.ts' }
);
```

## Dashboard

Access your ShadowStack dashboard at [https://app.shadowstack.dev](https://app.shadowstack.dev) to:

1. View dead code reports
2. Analyze code usage patterns
3. Set up GitHub repository connections
4. Configure scan settings
5. Generate cleanup recommendations

## Advanced Configuration

### Custom Tracking Endpoint

```typescript
createShadowStack({
  apiKey: 'your_api_key',
  projectId: 'your_project_id',
  endpoint: 'https://your-custom-endpoint.com/track'
});
```

### Sampling Rate

Control the percentage of events that are tracked:

```typescript
createShadowStack({
  apiKey: 'your_api_key',
  projectId: 'your_project_id',
  sampleRate: 0.1 // Track 10% of events
});
```

### Environment-Specific Configuration

```typescript
createShadowStack({
  apiKey: 'your_api_key',
  projectId: 'your_project_id',
  enabled: process.env.NODE_ENV === 'production', // Only track in production
  debug: process.env.NODE_ENV === 'development'  // Debug logs in development
});
```

## Best Practices

1. **Track Critical Components**: Focus on tracking components and functions that are most likely to contain dead code
2. **Use Sampling**: In high-traffic applications, use sampling to reduce the volume of tracking data
3. **Regular Scans**: Schedule regular scans to identify dead code as your application evolves
4. **Incremental Cleanup**: Address dead code in small, manageable chunks rather than all at once
5. **Test After Removal**: Always test thoroughly after removing dead code

## How It Works

1. **SDK Integration**: The ShadowStack SDK tracks code usage in your application
2. **Data Collection**: Usage data is sent to the ShadowStack API
3. **Static Analysis**: ShadowStack analyzes your codebase to identify potential dead code
4. **Usage Correlation**: The system correlates static analysis with real-world usage data
5. **Risk Assessment**: Each piece of dead code is assigned a risk level based on various factors
6. **Recommendations**: ShadowStack provides recommendations for safe code removal

## Support

For questions or support, contact us at support@shadowstack.dev or visit our [documentation](https://docs.shadowstack.dev).