// src/hooks/queries.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tmdbApi } from '../api/endpoints';
import type {
  MoviesQueryParams,
  RecommendationsParams,
  MoviesByActorParams,
  UserListParams
} from '@/types';
import { useAuthStore } from '@/store/auth-store';

// Query Keys
export const queryKeys = {
  genres: ['genres'] as const,
  movies: (params: MoviesQueryParams) => ['movies', params] as const,
  movie: (id: number) => ['movie', id] as const,
  recommendations: (params: RecommendationsParams) => ['recommendations', params] as const,
  actor: (id: number) => ['actor', id] as const,
  moviesByActor: (params: MoviesByActorParams) => ['moviesByActor', params] as const,
  account: ['account'] as const,
  userList: (params: UserListParams) => ['userList', params] as const,
};

// Genres Query
export const useGenres = () => {
  return useQuery({
    queryKey: queryKeys.genres,
    queryFn: tmdbApi.getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres rarely change
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: 2,
  });
};

// Movies Query
export const useMovies = (params: MoviesQueryParams) => {
  return useQuery({
    queryKey: queryKeys.movies(params),
    queryFn: () => tmdbApi.getMovies(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
    enabled: Boolean(params), // Only run if params exist
  });
};

// Single Movie Query
export const useMovie = (id: number) => {
  return useQuery({
    queryKey: queryKeys.movie(id),
    queryFn: () => tmdbApi.getMovie(id),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    enabled: Boolean(id),
  });
};

// Recommendations Query
export const useRecommendations = (params: RecommendationsParams) => {
  return useQuery({
    queryKey: queryKeys.recommendations(params),
    queryFn: () => tmdbApi.getRecommendations(params),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    enabled: Boolean(params.movie_id),
  });
};

// Actor Query
export const useActor = (id: number) => {
  return useQuery({
    queryKey: queryKeys.actor(id),
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
    queryKey: queryKeys.moviesByActor(params),
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
    queryKey: queryKeys.account,
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
    queryKey: queryKeys.userList(params),
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
    mutationFn: ({ movieId, watchlist }: { movieId: number; watchlist: boolean }) =>
      tmdbApi.addToWatchlist(accountId!, movieId, watchlist),
    onSuccess: () => {
      // Invalidate user lists to refresh data
      queryClient.invalidateQueries({
        queryKey: ['userList'],
      });
    },
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  const { accountId } = useAuthStore();

  return useMutation({
    mutationFn: ({ movieId, favorite }: { movieId: number; favorite: boolean }) =>
      tmdbApi.addToFavorites(accountId!, movieId, favorite),
    onSuccess: () => {
      // Invalidate user lists to refresh data
      queryClient.invalidateQueries({
        queryKey: ['userList'],
      });
    },
  });
};