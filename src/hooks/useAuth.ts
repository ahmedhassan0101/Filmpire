// src/hooks/useAuth.ts
import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchToken, createSessionId } from "../utils/auth";
import { tmdbApi } from "../api/endpoints";
import type { User } from "@/types";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    user,
    isAuthenticated,
    setUser,
    setSessionId,
    logout: logoutStore,
  } = useAuthStore();

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery<User>({
    queryKey: ["user", useAuthStore.getState().sessionId],
    queryFn: async () => {
      const sessionId = useAuthStore.getState().sessionId;
      if (!sessionId) throw new Error("No session ID");

      const user = await tmdbApi.getAccountDetails();
      return user;
    },
    enabled: isAuthenticated && !user,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
  const loginMutation = useMutation({
    mutationFn: fetchToken,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const login = useCallback(() => {
    loginMutation.mutate();
  }, [loginMutation]);

  const logout = useCallback(() => {
    logoutStore();
    queryClient.clear();
    window.location.href = "/";
  }, [logoutStore, queryClient]);

  useEffect(() => {
    if (userError && isAuthenticated) {
      console.error("Failed to fetch user, logging out...");
      logout();
    }
  }, [userError, isAuthenticated, logout]);

  useEffect(() => {
    if (userData && !user) {
      setUser(userData);
    }
  }, [userData, user, setUser]);

  const createSessionMutation = useMutation({
    mutationFn: createSessionId,
    onSuccess: async (sessionId: string) => {
      setSessionId(sessionId);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Session creation failed:", error);
      logoutStore();
    },
  });

  return {
    // state
    user,
    isAuthenticated,
    isLoggingIn: loginMutation.isPending || createSessionMutation.isPending,
    isLoadingUser,

    // actions
    login,
    logout,
    createSession: () => createSessionMutation.mutate(),

    // errors
    loginError: loginMutation.error || createSessionMutation.error,
  };
};
