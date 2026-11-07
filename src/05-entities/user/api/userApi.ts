import { baseApi } from "@/06-shared/api";
import type { UpdateMe, User } from "../model/types";
import { addCountryCode } from "@/06-shared/utils";

export const getMeRequest = async (): Promise<User> => {
  const res = await baseApi.get<User>("/users/me");
  return res.data;
};

export const updateMeRequest = async (data: Partial<UpdateMe>): Promise<User> => {
  const newData = {
    ...data,
    ...(data.phone_number && {
      phone_number: addCountryCode(data.phone_number),
    }),
    ...(data.email === "" && { email: null }),
  };
  const res = await baseApi.patch<User>("/users/me", newData);
  return res.data;
};
