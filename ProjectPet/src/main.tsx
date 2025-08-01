import { createRoot } from "react-dom/client";
import "./index.css";
import { darkTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/Router.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext/AuthProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <AuthProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </ThemeProvider>
);
