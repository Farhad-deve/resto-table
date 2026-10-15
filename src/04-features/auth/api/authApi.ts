import { baseApi } from "@/06-shared/api";
import type { LoginFormData, RegisterFormData } from "../model/schemas";
import type { User } from "@/05-entities/user";
import { addCountryCode } from "@/06-shared/lib/utils";

interface LoginResponse {
  access: string;
  refresh: string;
}

export const loginRequest = async ( data: LoginFormData ): Promise<LoginResponse> => {
  const newData = { ...data, phone_number: addCountryCode(data.phone_number) };
  const res = await baseApi.post<LoginResponse>("/auth/login", newData);
  return res.data;
};

export const registerRequest = async ( data: RegisterFormData ): Promise<User> => {
  const newData = { ...data, phone_number: addCountryCode(data.phone_number) };
  const res = await baseApi.post<User>("/auth/register", newData);
  return res.data;
};

export const logoutRequest = async (data: { refresh: string }) => {
  const res = await baseApi.post("/auth/logout", data);
  return res.data;
};
