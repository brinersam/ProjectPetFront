import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import App from "./App";
import { PATHS } from "../shared/paths";
import VolunteersPage from "../modules/Volunteers/pages/VolunteersPage";
import FavoritesPage from "../pages/FavoritesPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import { ProtectedRoute } from "../shared/components/ProtectedRoute";

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
