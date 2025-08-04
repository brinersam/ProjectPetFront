import { createRoot } from "react-dom/client";
import "./index.css";
import { darkTheme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <CssBaseline />
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
