// src/pages/Approved.tsx
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth-store";

export default function ApprovedPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, isLoggingIn, createSession } = useAuth();
  const [error, setError] = useState(false);
  const setRequestToken = useAuthStore((state) => state.setRequestToken);
  const requestToken = useAuthStore((state) => state.requestToken);
  const sessionId = useAuthStore((state) => state.sessionId);

  useEffect(() => {
    const handleCallback = () => {
      // Get token from URL params
      const approvedToken = searchParams.get("request_token");
      const denied = searchParams.get("denied");

      // User denied authorization
      if (denied) {
        setError(true);
        useAuthStore.getState().logout();
        return;
      }

      // No token found
      if (!approvedToken && !requestToken) {
        setError(true);
        return;
      }

      // Save token if it came from URL
      if (approvedToken && approvedToken !== requestToken) {
        setRequestToken(approvedToken);
      }

      // Create session if we don't have one
      if (!sessionId && !isLoggingIn) {
        setTimeout(() => createSession(), 100);
      }
    };

    handleCallback();
  }, [
    searchParams,
    requestToken,
    sessionId,
    isLoggingIn,
    createSession,
    setRequestToken,
  ]);

  // Redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && !isLoggingIn) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoggingIn, navigate]);

  // Auto redirect on error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4 max-w-md p-6">
        {isLoggingIn ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto" />
            <h2 className="text-2xl font-semibold">Completing Login...</h2>
            <p className="text-muted-foreground">
              Please wait while we authenticate your account.
            </p>
          </>
        ) : isAuthenticated ? (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold">Login Successful!</h2>
            <p className="text-muted-foreground">Redirecting you now...</p>
          </>
        ) : error ? (
          <>
            <div className="text-destructive text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-semibold">Login Failed</h2>
            <p className="text-muted-foreground mb-4">
              Something went wrong. Please try again.
            </p>
            <button
              onClick={() => navigate("/", { replace: true })}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Go Home
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto" />
            <h2 className="text-2xl font-semibold">Processing...</h2>
          </>
        )}
      </div>
    </div>
  );
}
