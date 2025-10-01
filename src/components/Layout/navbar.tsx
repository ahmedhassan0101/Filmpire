import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, LogOut, Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "./search";
import ModeToggle from "./mode-toggle";
import SidebarContent from "./sidebar-content";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { user, isAuthenticated, login, logout, isLoggingIn, loginError } =
    useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsMobileOpen(false);
      }
    };

    // Close mobile sidebar if already at desktop size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6 max-w-[1920px] mx-auto">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800"
            >
              <SidebarContent setMobileOpen={setIsMobileOpen} />
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 lg:hidden group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Filmpire
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center max-w-md mx-4 lg:mx-8">
          <Search />
        </div>

        {/* Right: Theme Toggle + Auth */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Authentication */}
          {!isAuthenticated ? (
            <Button
              variant="default"
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <UserCircle className="w-4 h-4 mr-2" />
                  <span>Login</span>
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Desktop Logout */}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden md:inline-flex text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </Button>

              {/* Profile Link */}
              <Link to={`/profile/${user?.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                >
                  <span className="hidden sm:inline text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                    My Movies
                  </span>
                  <Avatar className="w-8 h-8 ring-2 ring-amber-500/20 dark:ring-amber-400/20 group-hover:ring-amber-500/40 dark:group-hover:ring-amber-400/40 transition-all">
                    <AvatarImage
                      src={
                        user?.avatar?.tmdb?.avatar_path
                          ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar_path}`
                          : undefined
                      }
                    />
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 text-white">
                      <UserCircle className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Login Error Banner */}
      {loginError && (
        <div className="bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100 text-sm py-2.5 px-4 text-center border-b border-red-200 dark:border-red-900 animate-in slide-in-from-top">
          <span className="font-medium">Login failed.</span> Please try again.
        </div>
      )}
    </header>
  );
}
