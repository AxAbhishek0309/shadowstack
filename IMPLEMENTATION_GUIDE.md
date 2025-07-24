# ShadowStack Implementation Guide

This guide will help you implement ShadowStack in your application to detect and eliminate dead code.

## Step 1: Set Up Your ShadowStack Account

1. Sign up at [app.shadowstack.dev](https://app.shadowstack.dev)
2. Create a new project
3. Get your API key from the project settings

## Step 2: Install the SDK

### For Next.js Projects

```bash
npm install @shadowstack/sdk
# or
yarn add @shadowstack/sdk
```

### For Other React Projects

```bash
npm install @shadowstack/sdk @shadowstack/react
# or
yarn add @shadowstack/sdk @shadowstack/react
```

## Step 3: Configure the SDK

Create a `.env.local` file with your ShadowStack API key and project ID:

```
NEXT_PUBLIC_SHADOWSTACK_API_KEY="your_api_key"
NEXT_PUBLIC_SHADOWSTACK_PROJECT_ID="your_project_id"
```

## Step 4: Initialize the SDK

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

## Step 5: Track Your Code

### React Components

```tsx
// Using the hook
import { useShadowStack } from '@shadowstack/react';

function MyComponent() {
  const { trackFunction } = useShadowStack(
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

// Using the HOC
import { withShadowStack } from '@shadowstack/react';

function AnotherComponent(props) {
  return <div>{props.children}</div>;
}

export default withShadowStack(AnotherComponent, {
  componentName: 'AnotherComponent',
  filePath: 'path/to/AnotherComponent.tsx'
});
```

### Functions

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

## Step 6: Connect Your GitHub Repository

1. Go to your ShadowStack dashboard
2. Navigate to the "Repositories" section
3. Click "Connect GitHub"
4. Select the repositories you want to analyze
5. Configure scan settings

## Step 7: Run Your First Scan

1. Go to your ShadowStack dashboard
2. Navigate to the "Scans" section
3. Click "New Scan"
4. Select the repository to scan
5. Wait for the scan to complete

## Step 8: Review Dead Code

1. Go to your ShadowStack dashboard
2. Navigate to the "Dead Code" section
3. Review the identified dead code
4. Filter by risk level, file type, or last used date
5. Mark code for removal or as false positive

## Step 9: Clean Up Dead Code

1. Create a new branch in your repository
2. Remove the identified dead code
3. Run your tests to ensure nothing breaks
4. Submit a pull request
5. Mark the dead code as resolved in ShadowStack

## Step 10: Monitor Ongoing Usage

1. Keep the ShadowStack SDK in your application
2. Schedule regular scans (weekly or monthly)
3. Review new dead code findings
4. Maintain a clean codebase

## Best Practices

1. **Start Small**: Begin by tracking a few key components and functions
2. **Incremental Implementation**: Add tracking to more code over time
3. **Use Sampling**: In high-traffic applications, use sampling to reduce data volume
4. **Regular Scans**: Schedule automatic scans to catch new dead code early
5. **Team Awareness**: Ensure your team understands the importance of removing dead code

## Advanced Configuration

### Custom Tracking Endpoint

```typescript
createShadowStack({
  apiKey: 'your_api_key',
  projectId: 'your_project_id',
  endpoint: 'https://your-custom-endpoint.com/track'
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

## Need Help?

Contact our support team at support@shadowstack.dev or visit our [documentation](https://docs.shadowstack.dev) for more information.