// filmpire\src\router.tsx
import { lazy, Suspense } from "react";

import { createBrowserRouter } from "react-router-dom";

// import { Movies, MovieInfo, Actors, Profile, ApprovedPage } from "./pages";
const Movies = lazy(() => import("./pages/Movies"));
const MovieInfo = lazy(() => import("./pages/MovieInfo"));
const Profile = lazy(() => import("./pages/Profile"));
const Actors = lazy(() => import("./pages/Actors"));
const ApprovedPage = lazy(() => import("./pages/ApprovedPage"));
const RootLayout = lazy(() => import("./components/layout"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "actors/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Actors />
          </Suspense>
        ),
      },
      {
        path: "movie/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MovieInfo />
          </Suspense>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/approved",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ApprovedPage />
      </Suspense>
    ),
  },
]);
