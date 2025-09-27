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
  DramaIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useMoviesStore } from "@/store/movies-store";
import { useGenres } from "@/hooks/queries";

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
  { label: "Now Playing", value: "now_playing", icon: DramaIcon },
];

interface SidebarProps {
  setMobileOpen?: (open: boolean) => void;
}
export default function SidebarContent({ setMobileOpen }: SidebarProps) {
  const { data: genres, isLoading, error } = useGenres();
  const { genreIdOrCategoryName, setGenreOrCategory } = useMoviesStore();

  const handleCategoryAndGenreClick = (value: number | string) => {
    setGenreOrCategory(value);
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
                variant={
                  genreIdOrCategoryName === value ? "secondary" : "ghost"
                }
                className="w-full justify-start gap-3 h-10 font-medium"
                onClick={() => handleCategoryAndGenreClick(value)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
                {genreIdOrCategoryName === value && (
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
          ) : error ? (
            <div>Error loading genres</div>
          ) : (
            <div className="space-y-1">
              {genres?.genres.map(({ name, id }) => {
                const IconComponent = genreIcons[name.toLowerCase()] || Film;
                return (
                  <Button
                    key={id}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-10 font-medium hover:bg-secondary/80"
                    onClick={() => handleCategoryAndGenreClick(id)}
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
