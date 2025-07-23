import { createContext, useContext } from "react";
import { type UserData } from "../../api/authEP";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within AuthContext!");
  return authContext;
};

export type AuthData = {
  accessToken: string | undefined;
  userData: UserData | undefined;
  login: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthData | undefined>(undefined);
