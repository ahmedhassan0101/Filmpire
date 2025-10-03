// Filmpire\src\components\layout\index.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import { useMoviesStore } from "@/store/movies-store";
import { useEffect } from "react";

export default function RootLayout() {
  const location = useLocation();

  const resetFilters = useMoviesStore((state) => state.resetFilters);

  useEffect(() => {
    // If the path is not the main movies page (/), reset all filters (Genre/Category/Search)
    if (location.pathname !== "/") {
      resetFilters();
    }
    // This ensures that when the user is on /movie/123 or /profile/456,
    // the Sidebar does not show any category as active.
  }, [location.pathname, resetFilters]); // Dependency array: run when path changes

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col min-h-screen flex-1 ml-0 lg:ml-64">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
