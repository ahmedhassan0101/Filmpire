import { useMovies } from "@/hooks/queries";
// import { useMoviesStore } from "@/store";
import { MovieCard } from "./movie-card";
import { useMoviesStore } from "@/store/movies-store";

export default function MoviesList() {
  const { genreIdOrCategoryName, page, searchQuery } = useMoviesStore();

  const {
    data: movies,
    isLoading,
    error,
    isFetching,
  } = useMovies({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  console.log("🚀 ~ MoviesList ~ movies:", JSON.stringify(movies, null, 2) );

  if (isLoading) return <div>Loading movies...</div>;
  if (error) return <div>Error loading movies</div>;

  return (
    <></>
  );
}
    <div className="movies-list">
      <div className="flex justify-between items-center mb-4">
        <h3>Movies</h3>
        {isFetching && (
          <span className="text-sm text-gray-500">Updating...</span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movieId={movie.id} title={movie.title} />
        ))}
      </div>

      {movies && (
        <div className="mt-4 text-sm text-gray-600">
          Page {movies.page} of {movies.total_pages}({movies.total_results}{" "}
          results)
        </div>
      )}
    </div>