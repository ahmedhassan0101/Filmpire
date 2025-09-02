import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({children}: {children: ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

