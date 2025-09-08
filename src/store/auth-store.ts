import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types";
import { authUtils } from "../utils/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  accountId: string | null;
  setUser: (user: User) => void;
  setAuthenticated: (isAuth: boolean) => void;
  setSessionId: (sessionId: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        sessionId: null,
        accountId: null,

        setUser: (user: User) => {
          authUtils.setAccountId(user.id.toString());
          set({
            user,
            isAuthenticated: true,
            accountId: user.id.toString(),
          });
        },

        setAuthenticated: (isAuthenticated: boolean) => {
          set({ isAuthenticated });
        },

        setSessionId: (sessionId: string) => {
          authUtils.setSessionId(sessionId);
          set({ sessionId, isAuthenticated: true });
        },

        logout: () => {
          authUtils.clearAuth();
          set({
            user: null,
            isAuthenticated: false,
            sessionId: null,
            accountId: null,
          });
        },

        initializeAuth: () => {
          const sessionId = authUtils.getSessionId();
          const accountId = authUtils.getAccountId();

          if (sessionId) {
            set({
              isAuthenticated: true,
              sessionId,
              accountId,
            });
          }
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          accountId: state.accountId,
        }),
      }
    ),
    { name: "auth-store" }
  )
);
