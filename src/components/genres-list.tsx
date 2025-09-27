import { useGenres } from "@/hooks/queries";
import { useMoviesStore } from "@/store/movies-store";

export default function GenresList() {
  const { data: genres, isLoading, error } = useGenres();
  const { genreIdOrCategoryName, setGenreOrCategory } = useMoviesStore();

  if (isLoading) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres</div>;

  return (
    <div className="genres-list">
      <h3>Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres?.genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setGenreOrCategory(genre.id)}
            className={`px-3 py-1 rounded ${
              genreIdOrCategoryName === genre.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
