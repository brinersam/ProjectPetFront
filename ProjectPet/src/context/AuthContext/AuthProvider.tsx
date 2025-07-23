import type { InternalAxiosRequestConfig } from "axios";
import { type ReactNode, useState, useEffect, useLayoutEffect } from "react";
import AuthService from "../../api/Services/AuthService";
import { api } from "../../api/axiosFactory";
import { type AuthData, AuthContext } from "./AuthContext";
import ExceptionsHelper from "../../app/Helpers/ExceptionsHelper";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  //   const [userdata, setUserdata] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const tokenIcptr = api.interceptors.request.use((config) => {
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : config.headers.Authorization;
      return config;
    });
    return () => api.interceptors.response.eject(tokenIcptr);
  }, [accessToken]);

  useLayoutEffect(() => {
    const refreshIcptr = api.interceptors.response.use(
      (config) => config,
      async (error) => {
        if (error.response?.status == 401) {
          const originalRequest: InternalAxiosRequestConfig<any> = error.config;

          try {
            const refreshRequest = await AuthService.Refresh();
            setAccessToken(refreshRequest?.result);
            // setUserdata(refreshRequest.result?.userData);
            originalRequest.headers.Authorization = `Bearer ${refreshRequest?.result}`;

            return api(originalRequest);
          } catch (Exception) {
            setAccessToken(undefined);
            ExceptionsHelper.ToastError(Exception);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => api.interceptors.response.eject(refreshIcptr);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await AuthService.Login(email, password);
      setAccessToken(res.result.accessToken);
    } catch (Exception) {
      ExceptionsHelper.ToastError(Exception);
    }
  };

  return (
    <AuthContext.Provider
      value={
        {
          accessToken: accessToken,
          login,
        } as AuthData
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
