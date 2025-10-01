import type { Movie } from "@/types";
import MovieCard from "./movie-card";
import { Film, Sparkles } from "lucide-react";

interface MoviesListProps {
  movies: Movie[];
  numberOfMovies?: number;
  excludeFirst?: boolean;
}

export default function MoviesList({
  movies,
  numberOfMovies,
  excludeFirst = false,
}: MoviesListProps) {
  const startFrom = excludeFirst ? 1 : 0;
  const moviesToShow = movies.slice(startFrom, numberOfMovies);

  return (
    <section className="px-4 md:px-6">
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {excludeFirst ? "More to Explore" : "All Movies"}
          </h2>
          <Sparkles className="w-6 h-6 text-amber-500 dark:text-amber-400" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full">
            <Film className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              Showing {moviesToShow.length}
            </span>
          </div>
          <span className="text-slate-500 dark:text-slate-500">of</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold">
            {movies.length} movies
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4 md:gap-6">
        {moviesToShow.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
