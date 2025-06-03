import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import RouteLayoutHtml from "./RouteLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayoutHtml />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);
