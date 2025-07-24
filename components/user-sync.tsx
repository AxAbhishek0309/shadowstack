"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/**
 * UserSync component
 * 
 * This component validates the NextAuth user session.
 * It should be included in the root layout to ensure it runs on every page.
 */
export function UserSync() {
  const { data: session, status } = useSession();
  const [syncAttempted, setSyncAttempted] = useState(false);

  useEffect(() => {
    // Only run this effect when session is loaded
    if (status === "loading") return;
    
    // If not signed in, reset sync state
    if (status === "unauthenticated") {
      setSyncAttempted(false);
      return;
    }
    
    // If no user data or already attempted sync, don't sync again
    if (!session?.user || syncAttempted) return;

    const syncUser = async () => {
      try {
        console.log("🔄 User session active:", {
          userId: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        });
        
        // No database sync needed - just mark as synced
        console.log("✅ User session validated");
        setSyncAttempted(true);
        
      } catch (error) {
        console.error("❌ Error validating user session:", error);
      }
    };

    // Add a delay to ensure session is fully initialized
    const timeoutId = setTimeout(syncUser, 500);
    
    return () => clearTimeout(timeoutId);
  }, [status, session, syncAttempted]);

  // This component doesn't render anything
  return null;
}

export default UserSync;