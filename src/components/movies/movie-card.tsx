import { useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import { Star, Calendar, ImageOff, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  const ratingPercentage = (movie.vote_average / 10) * 100;

  return (
    <Link to={`/movie/${movie.id}`} className="group block movie-card">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 hover:scale-[1.02] hover:-translate-y-1">
        {/* Movie Poster */}
        <div className="aspect-[2/3] relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          {posterUrl ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
              )}

              <img
                src={posterUrl}
                alt={movie.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                } group-hover:scale-110`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
              <ImageOff className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-2" />
              <span className="text-xs text-slate-500 dark:text-slate-500">
                No Image
              </span>
            </div>
          )}

          {/* Rating Badge - Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-slate-900/90 dark:bg-slate-950/90 text-white border-0 backdrop-blur-md hover:bg-slate-900 shadow-lg px-2.5 py-1 flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="font-bold text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </Badge>
          </div>

          {/* Popularity Indicator - Top Left */}
          {movie.popularity > 500 && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-red-500/90 dark:bg-red-600/90 text-white border-0 backdrop-blur-md shadow-lg px-2 py-1 flex items-center gap-1 animate-pulse">
                <TrendingUp className="h-3 w-3" />
                <span className="font-bold text-xs">Hot</span>
              </Badge>
            </div>
          )}

          {/* Gradient Overlay - Appears on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Overview on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-white text-xs leading-relaxed line-clamp-4 drop-shadow-lg">
              {movie.overview || "No description available for this movie."}
            </p>
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Movie Info Card */}
        <div className="p-4 space-y-3 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50">
          {/* Title & Year */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm leading-snug line-clamp-2 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors min-h-[2.5rem]">
              {movie.title}
            </h3>

            {releaseYear && (
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Calendar className="h-3 w-3" />
                <span className="text-xs font-medium">{releaseYear}</span>
              </div>
            )}
          </div>

          {/* Rating Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Rating
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {movie.vote_average.toFixed(1)}
                <span className="text-slate-500 dark:text-slate-500">/10</span>
              </span>
            </div>

            <div className="relative w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 dark:from-amber-500 dark:via-orange-600 dark:to-red-600 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-amber-500/50"
                style={{ width: `${ratingPercentage}%` }}
              />
              {/* Shine effect */}
              <div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
                style={{
                  left: `${ratingPercentage}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          </div>

          {/* Vote Count */}
          <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
              {movie.vote_count.toLocaleString()} votes
            </span>
          </div>
        </div>

        {/* Card Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/50 dark:border-amber-400/50" />
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 opacity-20 blur-xl" />
        </div>
      </div>
    </Link>
  );
}
