/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/endpoints.ts
import apiClient from "./client";
import type {
  GenresResponse,
  MoviesResponse,
  MovieDetails,
  Person,
  User,
  MoviesQueryParams,
  RecommendationsParams,
  MoviesByActorParams,
  UserListParams,
} from "@/types";

export const tmdbApi = {
  // Get Genres
  getGenres: (): Promise<GenresResponse> => apiClient.get("/genre/movie/list"),

  // Get Movies with flexible parameters
  getMovies: async (params: MoviesQueryParams): Promise<MoviesResponse> => {
    const { genreIdOrCategoryName, page = 1, searchQuery } = params;

    // Search movies
    if (searchQuery) {
      return apiClient.get("/search/movie", {
        params: { query: searchQuery, page },
      });
    }

    // Get movies by category (popular, top_rated, etc.)
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
      return apiClient.get(`/movie/${genreIdOrCategoryName}`, {
        params: { page },
      });
    }

    // Get movies by genre
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
      return apiClient.get("/discover/movie", {
        params: { with_genres: genreIdOrCategoryName, page },
      });
    }

    // Default: popular movies
    return apiClient.get("/movie/popular", {
      params: { page },
    });
  },

  // Get single movie details
  getMovie: (id: number): Promise<MovieDetails> =>
    apiClient.get(`/movie/${id}`, {
      params: { append_to_response: "videos,credits" },
    }),

  // Get recommendations or similar movies
  getRecommendations: (
    params: RecommendationsParams
  ): Promise<MoviesResponse> =>
    apiClient.get(`/movie/${params.movie_id}/${params.list}`),

  // Get actor details
  getActor: (id: number): Promise<Person> => apiClient.get(`/person/${id}`),

  // Get movies by actor
  getMoviesByActorId: (params: MoviesByActorParams): Promise<MoviesResponse> =>
    apiClient.get("/discover/movie", {
      params: { with_cast: params.id, page: params.page || 1 },
    }),

  // Get user account details
  getAccountDetails: (): Promise<User> => apiClient.get(`/account`),

  getUserList: (params: UserListParams): Promise<MoviesResponse> =>
    apiClient.get(`/account/${params.accountId}/${params.listName}`, {
      params: { page: params.page || 1 },
    }),

  // Add to watchlist
  addToWatchlist: (
    accountId: string,
    movieId: number,
    watchlist: boolean
  ): Promise<any> =>
    apiClient.post(`/account/${accountId}/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist,
    }),

  // Add to favorites
  addToFavorites: (
    accountId: string,
    movieId: number,
    favorite: boolean
  ): Promise<any> =>
    apiClient.post(`/account/${accountId}/favorite`, {
      media_type: "movie",
      media_id: movieId,
      favorite,
    }),
};
