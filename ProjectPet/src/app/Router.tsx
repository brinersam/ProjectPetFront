import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import App from "./App";
import { PATHS } from "./Paths";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProfilePage from "../pages/ProfilePage";
import VolunteersPage from "../pages/VolunteersPage";
import FavoritesPage from "../pages/FavoritesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: PATHS.Index,
        element: (
          <ProtectedRoute neededRoles={["Member"]}>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.Login,
        element: <LoginPage />,
      },
      {
        path: PATHS.Registration,
        element: <RegistrationPage />,
      },
      {
        path: PATHS.Profile,
        element: <ProfilePage />,
      },
      {
        path: PATHS.Volunteer,
        element: (
          <ProtectedRoute>
            <VolunteersPage />,
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.Favorites,
        element: <FavoritesPage />,
      },
    ],
  },
]);
