import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "./TMDB";
import categoryReducer from "./categorySlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentCategory: categoryReducer,
    user: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
