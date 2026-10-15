import { baseApi } from "@/06-shared/api";
import type { User } from "../model/types";

export const getMeRequest = async (): Promise<User> => {
  const res = await baseApi.get<User>("/users/me");
  return res.data;
};
