// G:\Filmpire\src\main.tsx
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import Providers from "./providers";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);

