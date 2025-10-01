// src/types/index.ts

// Base API Response
export interface ApiResponse<T> {
  data: T;
  success?: boolean;
  status_message?: string;
}

// Genre Types
export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

// Movie Types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  videos?: VideosResponse;
  credits?: CreditsResponse;
  original_title: string;
  tagline: string;
  status: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Video Types
export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface VideosResponse {
  results: Video[];
}

// Credits Types
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  cast: Cast[];
  crew: Crew[];
}

// Person Types
export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
}

// Auth Types
export interface User {
  id: number;
  username: string;
  name: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar?: {
    gravatar?: {
      hash: string;
    };
    tmdb?: {
      avatar_path: string | null;
    };
  };
}

export interface AuthToken {
  request_token: string;
  expires_at: string;
  success: boolean;
}

export interface SessionResponse {
  session_id: string;
  success: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  accountId: string | null;
}

// Query Parameters Types
export interface MoviesQueryParams {
  genreIdOrCategoryName?: string | number;
  page?: number;
  searchQuery?: string;
}

export interface RecommendationsParams {
  movie_id: number;
  list: "recommendations" | "similar";
}

export interface MoviesByActorParams {
  id: number;
  page?: number;
}

export interface UserListParams {
  listName: "watchlist" | "favorite";
  accountId?: string;
  sessionId?: string;
  page?: number;
}
