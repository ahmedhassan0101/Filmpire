// src/api/client.ts
import { useAuthStore } from "@/store/auth-store";
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig, 
} from "axios";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Define a standard error shape for consistency
export interface ApiError {
  status_code: number;
  status_message: string;
  success: false;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // fail fast if API is slow/unresponsive
  params: {
    // TMDB requires api_key in every request
    api_key: API_KEY,
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const sessionId = authUtils.getSessionId();
    const sessionId = useAuthStore.getState().sessionId;
    if (sessionId) {
      // Add session_id to requests that need authentication
      const needsAuth = ["/account", "/favorite", "/watchlist", "/rated"].some(
        (path) => config.url?.includes(path)
      );

      if (needsAuth) {
        config.params = {
          ...config.params,
          session_id: sessionId,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  // unwrap .data directly for cleaner API calls
  (response: AxiosResponse) => response.data,

  (error) => {
    // Convert raw axios error into a consistent shape
    const apiError: ApiError = {
      status_code: error.response?.status || 500,
      status_message: error.response?.data?.status_message || error.message,
      success: false,
    };

    console.error("API Error:", apiError);

    // auto-clear session if unauthorized (401)
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      // Redirect to home if not already there
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    // always reject with standardized error
    return Promise.reject(apiError);
  }
);

export default apiClient;
