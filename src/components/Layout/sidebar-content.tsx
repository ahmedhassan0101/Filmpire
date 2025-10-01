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
  CircleAlert,
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
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Logo Section */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen?.(false)}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
            Filmpire
          </span>
        </Link>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1 px-3">
        {/* Categories Section */}
        <div className="py-6">
          <div className="px-3 mb-4">
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Categories
            </h3>
          </div>
          <div className="space-y-1">
            {categories.map(({ label, value, icon: Icon }) => {
              const isActive = genreIdOrCategoryName === value;
              return (
                <Link
                  key={value}
                  to="/"
                  onClick={() => handleCategoryAndGenreClick(value)}
                >
                  <Button
                    variant="ghost"
                    className={`
                    w-full justify-start gap-3 h-11 font-medium transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/30 text-amber-900 dark:text-amber-100 hover:from-amber-200 hover:to-amber-100 dark:hover:from-amber-900/60 dark:hover:to-amber-900/40 border-l-4 border-amber-500 dark:border-amber-400 shadow-sm"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent"
                    }
                  `}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-amber-600 dark:text-amber-400" : ""
                      }`}
                    />
                    <span className="flex-1 text-left">{label}</span>
                    {isActive && (
                      <Badge className="bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[10px] font-bold px-2 py-0 h-5 border-0">
                        Active
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800" />

        {/* Genres Section */}
        <div className="py-6">
          <div className="px-3 mb-4">
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Genres
            </h3>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="relative">
                <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 dark:border-t-amber-400 rounded-full animate-spin" />
              </div>
            </div>
          ) : error ? (
            <div className="px-3 py-6 text-center">
              <div className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-lg">
                <CircleAlert className="w-4 h-4" />
                <span>Failed to load genres</span>
              </div>
            </div>
          ) : (
            <div className="space-y-0.5">
              {genres?.genres.map(({ name, id }) => {
                const IconComponent = genreIcons[name.toLowerCase()] || Film;
                const isActive = Number(genreIdOrCategoryName) === id;

                return (
                  <Link
                    key={id}
                    to="/"
                    onClick={() => handleCategoryAndGenreClick(id)} // 💡 استبدل هذا بـ Link onClick إذا كان منطقك يتطلب الـ Dispatch أولاً
                  >
                    <Button
                      variant="ghost"
                      className={`
                      w-full justify-start gap-3 h-10 font-medium transition-all
                      ${
                        isActive
                          ? "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/30 text-amber-900 dark:text-amber-100 hover:from-amber-200 hover:to-amber-100 dark:hover:from-amber-900/60 dark:hover:to-amber-900/40 border-l-4 border-amber-500 dark:border-amber-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent"
                      }
                    `}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${
                          isActive ? "text-amber-600 dark:text-amber-400" : ""
                        }`}
                      />
                      <span className="text-left">{name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Spacing */}
        <div className="h-6" />
      </ScrollArea>

      {/* Footer (Optional) */}
      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-t from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
          Powered by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            TMDB
          </a>
        </p>
      </div>
    </div>
  );
}
