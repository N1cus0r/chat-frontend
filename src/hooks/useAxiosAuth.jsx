import { useEffect } from "react";
import axios from "axios";
import LocalStorageApi from "../utils/LocalStorageApi";
import TokenApi from "../utils/TokenApi";
import useAuth from "./useAuth";

const useAxiosAuth = () => {
  const { logoutUser } = useAuth();
  const accessToken = LocalStorageApi.getLocalStorageTokens()?.access;

  const axiosAuth = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      "Content-Type": "application/json",
    },
    params: {},
  });

  useEffect(() => {
    const requestInterceptor = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevConfig = error?.config;
        if (error.response.status === 401 && !prevConfig?.sent) {
          try {
            const accessToken = await TokenApi.refreshToken();
            prevConfig.headers.Authorization = `Bearer ${accessToken}`;
            return axiosAuth(prevConfig);
          } catch (error) {
            logoutUser();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestInterceptor);
      axiosAuth.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, logoutUser, axiosAuth]);

  return axiosAuth;
};

export default useAxiosAuth;
