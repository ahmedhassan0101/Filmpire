import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY;

const baseUrl = "https://api.themoviedb.org/3";
export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    //! Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovies: builder.query({
      query: ({ categoryName, page, searchQuery }) => {
        //![1]  Get Search Result
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //![2]  get Movies by Category
        if (categoryName && typeof categoryName === "string") {
          return `movie/${categoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        //![3]  get Movies by Id
        if (categoryName && typeof categoryName === "number") {
          return `discover/movie?with_genres=${categoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // //![4]  get Popular Movies
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;

// export const tmdbApi = createApi({
//
// 	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
// 	endpoints: (builder) => ({
// 		getGenres: builder.query({
// 			query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
// 		}),
// 		getMovies: builder.query({
// 			query: ({ categoryName, page, searchQuery }) => {
// 				// ! Get Search Result
// 				if (searchQuery) {
// 					return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
// 				}

// 				// ! get Movies by Category
// 				if (categoryName && typeof categoryName === 'string') {
// 					return `movie/${categoryName}/?page=${page}&api_key=${tmdbApiKey}`;
// 				}
// 				// ! get Movies by Id
// 				if (categoryName && typeof categoryName === 'number') {
// 					return `discover/movie?with_genres=${categoryName}&page=${page}&api_key=${tmdbApiKey}`;
// 				}
// 				// ! get Popular Movies
// 				return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
// 			},
// 		}),
// 		getMovie: builder.query({
// 			query: (id) =>
// 				`/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
// 		}),
// 		// ! Get User Specific Lists
// 		getList: builder.query({
// 			query: ({ listName, accountId, sessionId, page }) =>
// 				`/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
// 		}),
// 		// ! get User Specific List
// 		getRecommendations: builder.query({
// 			query: ({ id, list }) => `/movie/${id}/${list}?api_key=${tmdbApiKey}`,
// 		}),
// 		// !
// 		getActor: builder.query({
// 			query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
// 		}),
// 		getMoviesByActor: builder.query({
// 			query: ({ id, page }) =>
// 				`/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
// 		}),
// 	}),
// });

// export const {
// 	useGetMoviesQuery,
// 	useGetGenresQuery,
// 	useGetMovieQuery,
// 	useGetRecommendationsQuery,
// 	useGetActorQuery,
// 	useGetMoviesByActorQuery,
// 	useGetListQuery,
// } = tmdbApi;
