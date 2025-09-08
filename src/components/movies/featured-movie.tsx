// src/components/FeaturedMovie.tsx

import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import { Star, Calendar, Eye } from "lucide-react";
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
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-2xl group">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-6 pb-12">
          <div className="max-w-2xl space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {movie.title}
              </h1>
              {releaseYear && (
                <div className="flex items-center space-x-2 text-white/80">
                  <Calendar className="h-4 w-4" />
                  <span className="text-lg">{releaseYear}</span>
                </div>
              )}
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <Eye className="h-4 w-4 text-white/80" />
                <span className="text-white/80 text-sm">
                  {movie.vote_count} votes
                </span>
              </div>

              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Featured
              </Badge>
            </div>

            {/* Overview */}
            <p className="text-white/90 text-lg leading-relaxed max-w-xl line-clamp-3">
              {movie.overview}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <Link to={`/movie/${movie.id}`}>Watch Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
    </div>
  );
}
