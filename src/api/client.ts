// src/api/client.ts
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig, // ✅ Fix TS error
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
    // automatically add session_id if endpoint requires authentication
    const sessionId = localStorage.getItem("session_id");
    if (sessionId && config.url?.includes("/account/")) {
      config.params = {
        ...config.params,
        session_id: sessionId,
      };
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
      localStorage.removeItem("session_id");
      localStorage.removeItem("account_id");
      localStorage.removeItem("request_token");
    }

    // always reject with standardized error
    return Promise.reject(apiError);
  }
);

export default apiClient;
