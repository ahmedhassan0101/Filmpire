// src/App-Final.tsx - Complete working example
import React, { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { useAuth } from "@/hooks/useAuth";

// Auth initializer
const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};


// Approved page (after TMDB redirect)
const ApprovedPage: React.FC = () => {
  const { completeAuth, isCreatingSession } = useAuth();

  useEffect(() => {
    completeAuth();
  }, [completeAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Completing Authentication</h2>
        {isCreatingSession ? (
          <p>Creating your session...</p>
        ) : (
          <p>Redirecting...</p>
        )}
      </div>
    </div>
  );
};

// Error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      {/* <QueryClientProvider client={queryClient}> */}
      <Router>
        <AuthInitializer>
          <Routes>
            <Route path="/" element={<p>HomePage</p>} />
            <Route path="/approved" element={<ApprovedPage />} />
          </Routes>
        </AuthInitializer>
      </Router>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {/* </QueryClientProvider> */}
    </ErrorBoundary>
  );
}
