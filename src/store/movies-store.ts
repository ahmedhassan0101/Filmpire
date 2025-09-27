// src/store/index.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Movies Store
interface MoviesStore {
  genreIdOrCategoryName: string | number | null;
  page: number;
  searchQuery: string;
  setGenreOrCategory: (value: string | number | null) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  clearSearch: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const useMoviesStore = create<MoviesStore>()(
  devtools(
    (set, get) => ({
      genreIdOrCategoryName: null,
      page: 1,
      searchQuery: "",

      setGenreOrCategory: (genreIdOrCategoryName) => {
        set({
          genreIdOrCategoryName,
          page: 1, // Reset to first page
          searchQuery: "", // Clear search when selecting genre/category
        });
      },

      setSearchQuery: (searchQuery) => {
        set({
          searchQuery,
          page: 1, // Reset to first page
          genreIdOrCategoryName: null, // Clear genre when searching
        });
      },

      setPage: (page) => {
        set({ page });
      },
      nextPage: () => {
        set((state) => ({ page: state.page + 1 }));
      },

      prevPage: () => {
        const currentPage = get().page;
        if (currentPage > 1) {
          set({ page: currentPage - 1 });
        }
      },

      resetFilters: () => {
        set({
          genreIdOrCategoryName: null,
          page: 1,
          searchQuery: "",
        });
      },

      clearSearch: () => {
        set({ searchQuery: "", page: 1 });
      },
    }),
    { name: "movies-store" }
  )
);

