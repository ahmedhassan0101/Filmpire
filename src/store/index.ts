// src/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthState, MoviesState, User } from '@/types';
import { authUtils } from '../utils/auth';

// Auth Store
interface AuthStore extends AuthState {
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
        name: 'auth-storage',
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          accountId: state.accountId,
        }),
      }
    ),
    { name: 'auth-store' }
  )
);

// Movies Store
interface MoviesStore extends MoviesState {
  setGenreOrCategory: (value: string | number | null) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  clearSearch: () => void;
}

export const useMoviesStore = create<MoviesStore>()(
  devtools(
    (set) => ({
      genreIdOrCategoryName: null,
      page: 1,
      searchQuery: '',

      setGenreOrCategory: (genreIdOrCategoryName) => {
        set({
          genreIdOrCategoryName,
          page: 1,
          searchQuery: '', // Clear search when selecting genre/category
        });
      },

      setSearchQuery: (searchQuery) => {
        set({
          searchQuery,
          page: 1,
          genreIdOrCategoryName: null, // Clear genre when searching
        });
      },

      setPage: (page) => {
        set({ page });
      },

      resetFilters: () => {
        set({
          genreIdOrCategoryName: null,
          page: 1,
          searchQuery: '',
        });
      },

      clearSearch: () => {
        set({ searchQuery: '', page: 1 });
      },
    }),
    { name: 'movies-store' }
  )
);

// App Store (for global UI state)
interface AppStore {
  isLoading: boolean;
  isMobile: boolean;
  sidebarOpen: boolean;
  setLoading: (loading: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      isLoading: false,
      isMobile: false,
      sidebarOpen: false,

      setLoading: (isLoading) => set({ isLoading }),
      setIsMobile: (isMobile) => set({ isMobile }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    { name: 'app-store' }
  )
);