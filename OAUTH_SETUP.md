# OAuth Setup Guide

This guide will help you set up GitHub and Google OAuth for your ShadowStack application.

## Quick Setup (No Database Required)

This setup uses JWT sessions and doesn't require a database.

### 1. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: ShadowStack (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret**

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
5. Copy the **Client ID** and **Client Secret**

### 3. Generate NextAuth Secret

Generate a random secret for NextAuth:

```bash
# On Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# On Mac/Linux
openssl rand -base64 32
```

### 4. Update Environment Variables

Update your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# No database required - using JWT sessions

# ShadowStack SDK Configuration
NEXT_PUBLIC_SHADOWSTACK_API_KEY="ss_test_api_key_123456"
NEXT_PUBLIC_SHADOWSTACK_PROJECT_ID="shadowstack-demo"
NEXT_PUBLIC_SHADOWSTACK_ENDPOINT="http://localhost:3000/api/analytics"
```

### 5. Install Dependencies

The required dependencies should already be installed. If not:

```bash
npm install next-auth
```

### 6. Start Development Server

```bash
npm run dev
```

## Features

- ✅ GitHub OAuth authentication
- ✅ Google OAuth authentication  
- ✅ JWT-based sessions (no database required)
- ✅ Mock data for development
- ✅ All dashboard features working
- ✅ User profile management
- ✅ Repository management
- ✅ Dead code analysis simulation

## Production Setup

For production, update the callback URLs to use your production domain:
- GitHub: `https://yourdomain.com/api/auth/callback/github`
- Google: `https://yourdomain.com/api/auth/callback/google`
- NEXTAUTH_URL: `https://yourdomain.com`

## Testing

1. Visit `http://localhost:3000`
2. Click "Sign In" or "Get Started"
3. Choose GitHub or Google authentication
4. After successful login, you'll be redirected to the dashboard
5. All features will work with mock data

## Notes

- No database setup required
- User sessions are stored as JWT tokens
- All data is mocked for demonstration purposes
- Perfect for development and testing
- Can be easily extended to use a real database later