
import { useAuthStore } from "@/store/auth-store";
import apiClient from "../api/client";
import type { AuthToken, SessionResponse } from "@/types";


// Auth API functions
export const fetchToken = async (): Promise<void> => {
  const response: AuthToken = await apiClient.get("/authentication/token/new");
  const { request_token, success } = response;

  if (success) {
    useAuthStore.getState().setRequestToken(request_token);
    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/approved`;
  } else {
    throw new Error("Failed to create request token");
  }
};

export const createSessionId = async (): Promise<string> => {
  const token = useAuthStore.getState().requestToken;

  if (!token) {
    throw new Error("No request token found");
  }
  const response: SessionResponse = await apiClient.post(
    "/authentication/session/new",
    { request_token: token }
  );
  const { session_id, success } = response;
  if (!success) {
    throw new Error("Failed to create session");
  }
  useAuthStore.getState().clearRequestToken();
  return session_id;
};
