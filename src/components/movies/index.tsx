import { useMovies } from "@/hooks/queries";
import { useMoviesStore } from "@/store/movies-store";
import { Loader2, AlertCircle, Film, SearchX } from "lucide-react";
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

  // Responsive number of movies to show
  const getNumberOfMovies = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      // if (width >= 1536) return 23; // 2xl screens
      if (width >= 1280) return 19; // xl screens
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 dark:border-t-amber-400 rounded-full animate-spin" />
          <Film className="w-8 h-8 text-amber-500 dark:text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-slate-900 dark:text-white">
            Loading Movies
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Please wait while we fetch the latest content...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] px-4">
        <Alert className="max-w-md border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-900 dark:text-red-100 ml-2">
            <span className="font-semibold block mb-1">
              Oops! Something went wrong
            </span>
            <span className="text-sm">
              Failed to load movies. Please check your connection and try again.
            </span>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // No results state
  if (!moviesData?.results?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-950 dark:to-amber-900 flex items-center justify-center">
            <SearchX className="w-12 h-12 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 opacity-20 blur-xl" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            No Movies Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm md:text-base">
            {searchQuery ? (
              <>
                We couldn't find any movies matching{" "}
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  "{searchQuery}"
                </span>
                . Try adjusting your search terms.
              </>
            ) : (
              "No movies are available for this selection at the moment."
            )}
          </p>
        </div>
      </div>
    );
  }

  const featuredMovie = moviesData.results[0];

  return (
    <div className="space-y-10 md:space-y-12 pb-12">
      {/* Loading indicator for refetching */}
      {isFetching && !isLoading && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-5">
          <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 backdrop-blur-sm">
            <Loader2 className="h-4 w-4 animate-spin text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              Refreshing...
            </span>
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
