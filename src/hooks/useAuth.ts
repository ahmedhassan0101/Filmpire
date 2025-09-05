// src/hooks/useAuth.ts
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";
import { fetchToken, createSessionId } from "../utils/auth";
import { tmdbApi } from "../api/endpoints";
import type { User } from "@/types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    setUser,
    setSessionId,
    logout: logoutStore,
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: fetchToken,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: createSessionId,
    onSuccess: async (sessionId: string) => {
      setSessionId(sessionId);

      // Fetch user details after session creation
      try {
        const userDetails: User = await tmdbApi.getAccountDetails();
        setUser(userDetails);
        navigate("/"); // Redirect to home after successful login
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    },
    onError: (error) => {
      console.error("Session creation failed:", error);
    },
  });

  // Logout function
  const logout = useCallback(() => {
    logoutStore();
    queryClient.clear(); // Clear all cached data
    navigate("/");
  }, [logoutStore, queryClient, navigate]);

  // Login function
  const login = useCallback(() => {
    loginMutation.mutate();
  }, [loginMutation]);

  // Create session function (called after redirect from TMDB)
  const completeAuth = useCallback(() => {
    createSessionMutation.mutate();
  }, [createSessionMutation]);

  return {
    // State
    user,
    isAuthenticated,
    isLoggingIn: loginMutation.isPending,
    isCreatingSession: createSessionMutation.isPending,

    // Actions
    login,
    logout,
    completeAuth,

    // Errors
    loginError: loginMutation.error,
    sessionError: createSessionMutation.error,
  };
};
