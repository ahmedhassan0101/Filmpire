// filmpire\src\router.tsx
import { createBrowserRouter } from "react-router-dom";

import { Movies, MovieInfo, Actors, Profile } from "./pages";
import { RootLayout } from "./components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Movies /> },
      { path: "approved", element: <Movies /> },
      { path: "genre/:id", element: <Movies /> },
      { path: "actors/:id", element: <Actors /> },
      { path: "movie/:id", element: <MovieInfo /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "categories/:id", element: <Movies /> },
    ],
  },
]);
