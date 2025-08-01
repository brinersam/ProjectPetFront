import { useEffect, type PropsWithChildren } from "react";
import { useAppSelector } from "../reduxTypes";
import { authSelectors } from "../api/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../app/Paths";

type Props = {
  neededRoles?: string[];
} & PropsWithChildren;

export function ProtectedRoute({ children, neededRoles }: Props) {
  const navigate = useNavigate();
  let redirectToLogin = false;

  useEffect(() => {
    if (redirectToLogin) {
      navigate(PATHS.Login);
      redirectToLogin = false;
    }
  }, [redirectToLogin]);

  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const isAuthLoading =
    useAppSelector(authSelectors.selectLoginStatus) == "loading";
  const userRoles = useAppSelector(authSelectors.selectUserRoles);

  let hasAllRoles = neededRoles
    ? neededRoles?.every((role) => userRoles?.includes(role))
    : true;

  const hasAccess = isAuthenticated && hasAllRoles;

  if (isAuthLoading) return <div>Loading...</div>;

  if (hasAccess) return children;

  redirectToLogin = true;
}
