import React from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  RootLayout,
  Movies,
  MovieInfo,
  Actors,
  Profile,
} from "./components/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Movies /> },
      { path: "/approved", element: <Movies /> },
      { path: "/genre/:id", element: <Movies /> },
      { path: "/actors/:id", element: <Actors /> },
      { path: "/movie/:id", element: <MovieInfo /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/categories/:id", element: <Movies /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
