"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Github } from "lucide-react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  // If the user is already signed in, redirect them
  useEffect(() => {
    if (status === "authenticated") {
      router.push(redirectUrl);
    }
  }, [status, router, redirectUrl]);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: redirectUrl });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/25 corner-glow">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent ml-3">
            ShadowStack
          </span>
        </div>
        
        <Card className="glass-card corner-glow card-realistic p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              Sign In to Continue
            </h1>
            <p className="text-gray-400 mt-2">
              Access your dashboard and manage your repositories
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={() => handleSignIn("github")}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
              size="lg"
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
            
            <Button
              onClick={() => handleSignIn("google")}
              className="w-full bg-white hover:bg-gray-100 text-black"
              size="lg"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/sign-up")}
                className="text-orange-400 hover:text-orange-500 underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}