import { useMovie } from "@/hooks/queries";

interface MovieCardProps {
  movieId: number;
  title: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movieId, title }) => {
  const { data: movie, isLoading } = useMovie(movieId);

  if (isLoading) {
    return <div className="bg-gray-200 animate-pulse h-48 rounded"></div>;
  }

  return (
    <div className="movie-card cursor-pointer hover:scale-105 transition-transform">
      <div className="bg-gray-100 h-48 rounded mb-2 flex items-center justify-center">
        {movie?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-gray-500 text-sm text-center p-2">{title}</span>
        )}
      </div>
      <h4 className="text-sm font-medium truncate">{title}</h4>
      {movie && (
        <p className="text-xs text-gray-600">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      )}
    </div>
  );
};
