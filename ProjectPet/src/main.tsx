import { createRoot } from "react-dom/client";
import "./index.css";
import { darkTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/Router.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <AuthProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
);
