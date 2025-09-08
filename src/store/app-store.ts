import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    { name: "app-store" }
  )
);
