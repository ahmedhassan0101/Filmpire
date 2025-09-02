/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import {
  Film,
  TrendingUp,
  Star,
  Calendar,
  Drama,
  Zap,
  Heart,
  Skull,
  Sparkles,
  Users,
  Swords,
  Music,
  History,
  Target,
  Flame,
  Smile,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Icon mapping for genres
const genreIcons: Record<string, any> = {
  action: Zap,
  adventure: Target,
  animation: Sparkles,
  comedy: Smile,
  crime: Skull,
  documentary: Film,
  drama: Drama,
  family: Users,
  fantasy: Sparkles,
  history: History,
  horror: Skull,
  music: Music,
  mystery: Target,
  romance: Heart,
  "science fiction": Globe,
  thriller: Flame,
  war: Swords,
  western: Target,
};

const categories = [
  { label: "Popular", value: "popular", icon: TrendingUp },
  { label: "Top Rated", value: "top_rated", icon: Star },
  { label: "Upcoming", value: "upcoming", icon: Calendar },
];

// Mock genres data - replace with your actual data fetching
const mockGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
interface SidebarProps {
  setMobileOpen?: (open: boolean) => void;
}

export default function SidebarContent({ setMobileOpen }: SidebarProps) {
  const isLoading = false; // Replace with your actual loading state
  const currentSelection = "popular"; // Replace with your actual selection state

  const handleCategoryClick = (value: string) => {
    // Add your category selection logic here
    console.log("Category selected:", value);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleGenreClick = (id: number) => {
    // Add your genre selection logic here
    console.log("Genre selected:", id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };



  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-center px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 h-16">
          <Film className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Filmpire
          </span>
        </Link>
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-4rem)] px-4">
        {/* Categories Section */}
        <div className="py-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map(({ label, value, icon: Icon }) => (
              <Button
                key={value}
                variant={currentSelection === value ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10 font-medium"
                onClick={() => handleCategoryClick(value)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
                {currentSelection === value && (
                  <Badge variant="secondary" className="ml-auto">
                    Active
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mx-0" />

        {/* Genres Section */}
        <div className="py-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
            Genres
          </h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-1">
              {mockGenres.map(({ name, id }) => {
                const IconComponent = genreIcons[name.toLowerCase()] || Film;
                return (
                  <Button
                    key={id}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 font-medium hover:bg-secondary/80"
                    onClick={() => handleGenreClick(id)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{name}</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
