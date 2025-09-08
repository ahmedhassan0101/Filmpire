// src/components/MoviesList.tsx

import type { Movie } from '@/types';
import MovieCard from './movie-card';


interface MoviesListProps {
  movies: Movie[];
  numberOfMovies?: number;
  excludeFirst?: boolean;
}

export default function MoviesList({ movies, numberOfMovies, excludeFirst = false }: MoviesListProps) {
  const startFrom = excludeFirst ? 1 : 0;
  const moviesToShow = movies.slice(startFrom, numberOfMovies);

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {excludeFirst ? 'More Movies' : 'Movies'}
        </h2>
        <p className="text-muted-foreground">
          Showing {moviesToShow.length} of {movies.length} movies
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {moviesToShow.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
    </div>
  );
}