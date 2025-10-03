import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-client";
// import { ErrorBoundary } from "@/components";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    // </ErrorBoundary>
  );
}
