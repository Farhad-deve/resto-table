import { baseApi } from "@/shared/api/baseApi";
import type { LoginForm, RegisterForm } from "../model/schemas";
import type { User } from "@/entities/user/model/types";

interface LoginResponse {
  access: string;
  refresh: string;
};

interface RegisterResponse {
  message: string;
  data: User;
};

export const loginRequest = async (data: LoginForm): Promise<LoginResponse> => {
  const res = await baseApi.post<LoginResponse>("/login/", data);
  return res.data;
};

export const registerRequest = async (data: RegisterForm): Promise<RegisterResponse> => {
  const res = await baseApi.post<RegisterResponse>("/sign-up/", data);
  return res.data
};
