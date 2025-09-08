import { useMovies } from "@/hooks/queries";
import { useMoviesStore } from "@/store/movies-store";
// import { Movie } from '@/types';
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import FeaturedMovie from "./featured-movie";
import MoviesPagination from "./movies-pagination";
import MoviesList from "./movies-list";

export default function MoviesPage() {
  const { genreIdOrCategoryName, page, searchQuery, setPage } =
    useMoviesStore();

  const {
    data: moviesData,
    isLoading,
    error,
    isFetching,
  } = useMovies({
    genreIdOrCategoryName: genreIdOrCategoryName ?? undefined,
    page,
    searchQuery,
  });
  // const isFetching = true;
  // Responsive number of movies to show
  const getNumberOfMovies = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1200) return 19; // xl screens
      if (width >= 1024) return 17; // lg screens
      if (width >= 768) return 15; // md screens
      return 12; // sm screens
    }
    return 19;
  };

  const numberOfMovies = getNumberOfMovies();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading movies...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            An error occurred while loading movies. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No results state
  if (!moviesData?.results?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center">
        <div className="text-6xl opacity-20">🎬</div>
        <h2 className="text-2xl font-semibold tracking-tight">
          No movies found
        </h2>
        <p className="text-muted-foreground max-w-md">
          {searchQuery
            ? `No movies match "${searchQuery}". Try searching for something else.`
            : "No movies available for this selection."}
        </p>
      </div>
    );
  }

  const featuredMovie = moviesData.results[0];

  return (
    <div className="space-y-8 pb-8">
      {/* Loading indicator for refetching */}
      {isFetching && !isLoading && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-background border rounded-lg px-3 py-2 shadow-lg flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Updating...</span>
          </div>
        </div>
      )}

      {/* Featured Movie - Hero Section */}
      <FeaturedMovie movie={featuredMovie} />

      {/* Movies Grid */}
      <MoviesList
        movies={moviesData.results}
        numberOfMovies={numberOfMovies}
        excludeFirst={true}
      />

      {/* Pagination */}
      <MoviesPagination
        currentPage={page}
        totalPages={moviesData.total_pages}
        onPageChange={setPage}
      />
    </div>
  );
}
