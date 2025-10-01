// src/hooks/useMovieInfoLogic.ts
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddToFavorites,
  useAddToWatchlist,
  useMovie,
  useRecommendations,
  useUserList,
} from "@/hooks/queries";
import { useAuthStore } from "@/store/auth-store";
import { useMoviesStore } from "@/store/movies-store";

export const useMovieInfoLogic = () => {
  const { id } = useParams() as { id: string };
  const movieId = Number(id);

  // 1. Data & State
  const { data: movie, isLoading } = useMovie(id);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accountId = useAuthStore((state) => state.accountId);
  const setGenreOrCategory = useMoviesStore(
    (state) => state.setGenreOrCategory
  );
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // 2. Fetch User Lists
  const { data: watchlistData } = useUserList({
    listName: "watchlist",
    accountId: accountId || "",
  });
  const { data: favoritesData } = useUserList({
    listName: "favorite",
    accountId: accountId || "",
  });

  // 3. Fetch Recommendations
  const { data: recommendations } = useRecommendations({
    movie_id: movieId,
    list: "recommendations",
  });
  const { data: similar } = useRecommendations({
    movie_id: movieId,
    list: "similar",
  });

  // 4. Mutations
  const addToWatchlistMutation = useAddToWatchlist();
  const addToFavoritesMutation = useAddToFavorites();

  // 5. Computed Status
  const isInWatchlist = useMemo(() => {
    return watchlistData?.results?.some((m) => m.id === movieId) || false;
  }, [watchlistData, movieId]);

  const isInFavorites = useMemo(() => {
    return favoritesData?.results?.some((m) => m.id === movieId) || false;
  }, [favoritesData, movieId]);

  const trailers = useMemo(() => {
    return movie?.videos?.results?.filter((v) => v.type === "Trailer") || [];
  }, [movie]);

  const currentVideo = trailers[activeVideoIndex];

  // 6. Action Handlers
  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      alert("Please login to add to watchlist");
      return;
    }
    addToWatchlistMutation.mutate({
      movieId: movieId,
      watchlist: !isInWatchlist,
    });
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      alert("Please login to add to favorites");
      return;
    }
    addToFavoritesMutation.mutate({
      movieId: movieId,
      favorite: !isInFavorites,
    });
  };
  const handleCategoryAndGenreClick = (value: number | string) => {
    setGenreOrCategory(value);
  };
  // 7. Share Handler (Implementation below)
  const handleShare = () => {
    if (navigator.share && movie?.title) {
      navigator
        .share({
          title: `Check out ${movie.title} on Filmpire!`,
          text: movie.tagline || movie.overview?.substring(0, 100),
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return {
    movie,
    isLoading,
    trailers,
    currentVideo,
    activeVideoIndex,
    setActiveVideoIndex,
    handleCategoryAndGenreClick,
    recommendations: recommendations?.results || [],
    similar: similar?.results || [],
    isInWatchlist,
    isInFavorites,
    handleWatchlistToggle,
    handleFavoriteToggle,
    handleShare,
    isTogglingWatchlist: addToWatchlistMutation.isPending,
    isTogglingFavorite: addToFavoritesMutation.isPending,
  };
};
