/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "./search";
import ModeToggle from "./mode-toggle";
import SidebarContent from "./sidebar-content";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, _setIsAuthenticated] = useState(false);
  const [user, _setUser] = useState<any>(null);

  // Your authentication logic will go here later
  useEffect(() => {
    // Add your auth logic here
  }, []);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login clicked");
  };
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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center gap-4">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent setMobileOpen={setIsMobileOpen} />
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <span className="text-xl font-bold text-primary">Filmpire</span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center max-w-md mx-4 lg:mx-8">
          <Search />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Theme Toggle */}
          <ModeToggle />

          {/* Authentication */}
          {!isAuthenticated ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleLogin}
              className="hidden sm:inline-flex"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Login
            </Button>
          ) : (
            <Link to={`/profile/${user?.id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="hidden sm:inline">My Movies</span>
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      user?.avatar?.tmdb?.avatar?.avatar_path
                        ? `https://www.themoviedb.org/t/p/w64_and_h64_face${user.avatar.tmdb.avatar.avatar_path}`
                        : undefined
                    }
                  />
                  <AvatarFallback>
                    <UserCircle className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
