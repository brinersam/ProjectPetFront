import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/reduxTypes";
import { authSelectors } from "../../modules/Auth/AuthSlice";
import { PATHS } from "../paths";

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
