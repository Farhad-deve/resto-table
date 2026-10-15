import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../config/consants";
import { refreshTokenRequest } from "./refreshTokenRequest";
import { API_URL } from "../config/consants";

export const baseApi = axios.create({
  baseURL: API_URL,
});

baseApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const NO_REFRESH_URLS = ["/auth/login", "/auth/register", "/auth/refresh"];

let onSessionExpired: () => void = () => {};
export const setSessionExpiredHandler = (handler: () => void) => {
  onSessionExpired = handler;
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) throw new Error("Refresh token not found");
  const res = await refreshTokenRequest(refreshToken);
  localStorage.setItem(ACCESS_TOKEN_KEY, res.access);
  return res.access;
};
 
baseApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig;
    const skip =
      !original ||
      original._retry ||
      error.response?.status !== 401 ||
      NO_REFRESH_URLS.some((url) => original.url?.startsWith(url));

    if (skip) return Promise.reject(error);

    original._retry = true;

    const current = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (current && original.headers.Authorization !== `Bearer ${current}`) {
      return baseApi(original);
    }

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      await refreshPromise;
      
      return baseApi(original);
    } catch (err) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      onSessionExpired();
      return Promise.reject(error);
    }
  },
);
