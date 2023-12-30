import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "./TMDB";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

/*
import categoryReducer from '../features/categorySlice';
import authReducer from '../features/authSlice';
export const store = configureStore({
	reducer: {
		currentCategory: categoryReducer,
		user: authReducer,
	},
});
*/
