import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
  accountId: string | null;
  requestToken: string | null;

  setUser: (user: User) => void;
  setAuthenticated: (isAuth: boolean) => void;
  setSessionId: (sessionId: string) => void;
  setRequestToken: (token: string) => void;
  clearRequestToken: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        sessionId: null,
        accountId: null,
        requestToken: null,

        setUser: (user: User) => {
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
          set({ sessionId, isAuthenticated: true });
        },
        setRequestToken: (requestToken: string) => {
          set({ requestToken });
        },
        clearRequestToken: () => {
          set({ requestToken: null });
        },
        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
            sessionId: null,
            accountId: null,
            requestToken: null,
          });
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          accountId: state.accountId,
          sessionId: state.sessionId,
          requestToken: state.requestToken,
        }),
        onRehydrateStorage: () => (state) => {
          if (state?.sessionId && state?.accountId) {
            state.isAuthenticated = true;
          }
        },
      }
    ),
    { name: "auth-store" }
  )
);
