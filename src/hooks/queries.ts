// src/hooks/queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tmdbApi } from "../api/endpoints";
import type {
  MoviesQueryParams,
  RecommendationsParams,
  MoviesByActorParams,
  UserListParams,
} from "@/types";
import { useAuthStore } from "@/store/auth-store";

// Query Keys

// Genres Query
export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"] as const,
    queryFn: tmdbApi.getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres rarely change
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
  });
};

// Movies Query
export const useMovies = (params: MoviesQueryParams) => {
  return useQuery({
    queryKey: ["movies", params] as const,
    queryFn: () => tmdbApi.getMovies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
    enabled: Boolean(params), // Only run if params exist
  });
};

// Single Movie Query
export const useMovie = (id: string | undefined) => {
  return useQuery({
    queryKey: ["movie", id] as const,
    queryFn: () => tmdbApi.getMovie(id!),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    enabled: Boolean(id),
  });
};

// Recommendations Query
export const useRecommendations = (params: RecommendationsParams) => {
  return useQuery({
    queryKey: ["recommendations", params] as const,
    queryFn: () => tmdbApi.getRecommendations(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    enabled: Boolean(params.movie_id),
  });
};

// Actor Query
export const useActor = (id: string) => {
  return useQuery({
    queryKey: ["actor", id] as const,
    queryFn: () => tmdbApi.getActor(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 3, // 3 days
    retry: 2,
    enabled: Boolean(id),
  });
};

// Movies by Actor Query
export const useMoviesByActor = (params: MoviesByActorParams) => {
  return useQuery({
    queryKey: ["moviesByActor", params] as const,
    queryFn: () => tmdbApi.getMoviesByActorId(params),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 1,
    enabled: Boolean(params.id),
  });
};

// Account Details Query (requires authentication)
export const useAccountDetails = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["account"] as const,
    queryFn: tmdbApi.getAccountDetails,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 4, // 4 hours
    retry: 1,
    enabled: isAuthenticated,
  });
};

// User List Query (watchlist, favorites)
export const useUserList = (params: UserListParams) => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["userList", params] as const,
    queryFn: () => tmdbApi.getUserList(params),
    staleTime: 1000 * 60 * 2, // 2 minutes - user lists change frequently
    gcTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    enabled: isAuthenticated && Boolean(params.accountId),
  });
};

// Mutations for user actions
export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  const { accountId } = useAuthStore();

  return useMutation({
    mutationFn: ({
      movieId,
      watchlist,
    }: {
      movieId: number;
      watchlist: boolean;
    }) => tmdbApi.addToWatchlist(accountId!, movieId, watchlist),
    onSuccess: () => {
      // Invalidate user lists to refresh data
      queryClient.invalidateQueries({
        queryKey: ["userList"],
      });
    },
    onError: (error) => {
      console.error("Error updating watchlist:", error);
    },
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { accountId } = useAuthStore();

  return useMutation({
    mutationFn: ({
      movieId,
      favorite,
    }: {
      movieId: number;
      favorite: boolean;
    }) => tmdbApi.addToFavorites(accountId!, movieId, favorite),
    onSuccess: () => {
      // Invalidate user lists to refresh data
      queryClient.invalidateQueries({
        queryKey: ["userList"],
      });
    },

    onError: (error) => {
      console.error("Error updating watchlist:", error);
    },
  });
};
