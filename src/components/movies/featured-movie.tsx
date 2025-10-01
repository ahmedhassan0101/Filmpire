import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import { Star, Calendar, Eye, Play, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturedMovieProps {
  movie: Movie;
}

export default function FeaturedMovie({ movie }: FeaturedMovieProps) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className="relative h-[75vh] min-h-[600px] w-full overflow-hidden rounded-3xl group mx-4 md:mx-6 shadow-2xl">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20" />
        )}

        {/* Multi-layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent dark:from-slate-950 dark:via-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent dark:from-slate-950/90 dark:via-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 dark:to-slate-950/70" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-400/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="w-full px-6 md:px-12 pb-12 md:pb-16">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            {/* Featured Badge */}
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white border-0 shadow-lg px-4 py-1.5 text-sm font-semibold">
              ⭐ Featured Movie
            </Badge>

            {/* Title & Year */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                {movie.title}
              </h1>
              {releaseYear && (
                <div className="flex items-center gap-2 text-white/90">
                  <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/20">
                    <Calendar className="h-4 w-4" />
                    <span className="text-base font-semibold">{releaseYear}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-2 bg-amber-500/20 dark:bg-amber-600/20 backdrop-blur-md rounded-full pl-3 pr-4 py-2 border border-amber-500/30 dark:border-amber-600/30">
                <Star className="h-5 w-5 text-amber-400 dark:text-amber-300 fill-amber-400 dark:fill-amber-300" />
                <span className="text-white font-bold text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-white/70 text-sm">/10</span>
              </div>

              {/* Vote Count */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Eye className="h-4 w-4 text-white/80" />
                <span className="text-white/90 text-sm font-medium">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              </div>

              {/* Popularity */}
              {movie.popularity && (
                <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90 text-sm font-medium">
                    Popular
                  </span>
                </div>
              )}
            </div>

            {/* Overview */}
            <p className="text-white/95 text-base md:text-lg leading-relaxed max-w-2xl line-clamp-3 drop-shadow-lg font-light">
              {movie.overview || "No description available for this movie."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-white/90 text-slate-900 font-bold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 group/btn"
              >
                <Link to={`/movie/${movie.id}`} className="flex items-center gap-2  cursor-pointer z-50">
                  <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  Watch Now
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-md font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl transition-all duration-300"
              >
                <Link to={`/movie/${movie.id}`} className="flex items-center gap-2 cursor-pointer z-50" >
                  <Info className="w-5 h-5" />
                  More Info
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/0 to-amber-900/0 group-hover:from-amber-900/10 group-hover:to-transparent transition-all duration-700" />
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 dark:from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
