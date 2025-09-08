// src/components/MovieCard.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import { Star, Calendar, ImageOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  const posterUrl =
    movie.poster_path && !imageError
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className="group cursor-pointer movie-card">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-card border transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2">
          {/* Movie Poster */}
          <div className="aspect-[2/3] relative overflow-hidden bg-muted">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                <ImageOff className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}

            {/* Rating Badge */}
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-black/70 text-white border-none backdrop-blur-sm hover:bg-black/80"
              >
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                {movie.vote_average.toFixed(1)}
              </Badge>
            </div>

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm line-clamp-3 leading-relaxed">
                {movie.overview || "No description available."}
              </p>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {movie.title}
              </h3>

              {releaseYear && (
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">{releaseYear}</span>
                </div>
              )}
            </div>

            {/* Rating Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Rating</span>
                <span className="text-xs font-medium">
                  {movie.vote_average.toFixed(1)}/10
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full transition-all duration-500 group-hover:from-yellow-300 group-hover:to-orange-300"
                  style={{ width: `${(movie.vote_average / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
        </div>
      </Link>
    </div>
  );
}

// // Add CSS for fade in animation
// const style = document.createElement("style");
// style.textContent = `
//   @keyframes fadeInUp {
//     from {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;
// document.head.appendChild(style);
