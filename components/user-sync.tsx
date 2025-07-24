"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

/**
 * UserSync component
 * 
 * This component synchronizes the NextAuth user with our database.
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
        console.log("🔄 Syncing user with database...", {
          userId: session.user.id,
          email: session.user.email,
          name: session.user.name,
          image: session.user.image
        });
        
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Failed to sync user with database:", response.status, errorText);
          
          // Log more details for debugging
          console.error("❌ Response details:", {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          });
          
          return;
        }

        const data = await response.json();
        console.log("✅ User synced successfully:", data.id);
        setSyncAttempted(true);
        
      } catch (error) {
        console.error("❌ Error syncing user:", error);
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