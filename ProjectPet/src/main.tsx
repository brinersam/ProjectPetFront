import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
