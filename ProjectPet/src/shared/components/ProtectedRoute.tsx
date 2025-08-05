import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/reduxTypes";
import { authActions, authSelectors } from "../../modules/Auth/AuthSlice";
import { PATHS } from "../paths";
import { useRefreshMutation } from "../../modules/Auth/AuthApi";

type Props = {
  neededRoles?: string[];
} & PropsWithChildren;

type PageState = "Idle" | "Authorizing" | "Denied" | "Allowed";

export function ProtectedRoute({ children, neededRoles }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pageState, setPageState] = useState<PageState>("Idle");

  useEffect(() => {
    // redirect to login on denied
    if (pageState == "Denied") {
      dispatch(authActions.doIdle());
      navigate(PATHS.Login);
    }
  }, [pageState]);

  const [refresh] = useRefreshMutation();

  const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
  const userRoles = useAppSelector(authSelectors.selectUserRoles);

  useEffect(() => {
    // if not authenticated try to authenticate if fails set state to denied
    if (!isAuthenticated) {
      dispatch(authActions.doLoading());
      const refreshResult = async () => await refresh().unwrap();
      refreshResult().then(
        (res) => {
          if (!res?.result) {
            // no error but empty means invalid session
            setPageState("Denied");
            return;
          }
          dispatch(authActions.doLogin(res.result));
          setPageState("Authorizing");
        },
        (error) => {
          setPageState("Denied");
        }
      );
    } else {
      setPageState("Authorizing");
    }
  }, []);

  useEffect(() => {
    // if we're idle then return (initial render)
    // if we're authorizing and authenticated, check roles
    if (pageState != "Authorizing") return;

    if (!isAuthenticated) {
      setPageState("Denied");
      return;
    }

    let hasAllRoles = neededRoles
      ? neededRoles?.every((role) => userRoles?.includes(role))
      : true;

    const hasAccess = isAuthenticated && hasAllRoles;
    if (hasAccess) {
      setPageState("Allowed");
    } else {
      setPageState("Denied");
    }
  }, [pageState]);

  return <>{Render()}</>;

  function Render(): ReactNode {
    return pageState == "Idle" || pageState == "Authorizing" ? (
      Loading()
    ) : pageState == "Denied" ? (
      Denied()
    ) : pageState == "Allowed" ? (
      children
    ) : (
      <>ERROR SOMETHING WENT WRONG</>
    );
  }

  function Loading(): ReactNode {
    return <div>Loading...</div>;
  }
  function Denied(): ReactNode {
    return <div>401 Unauthenticated</div>;
  }
}
