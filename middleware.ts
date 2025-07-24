import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/sign-in',
          '/sign-up',
          '/api/auth',
          '/api/analytics'
        ]
        
        const { pathname } = req.nextUrl
        
        // Allow access to public routes
        if (publicRoutes.some(route => pathname.startsWith(route))) {
          return true
        }
        
        // Require authentication for all other routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}