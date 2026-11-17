import { baseApi } from "@/06-shared/api";
import type { RestaurantAdmin, RestaurantAdminParameters, UpdatePasswordType } from "../model/types";
import type { CommonGetResponse } from "@/06-shared/model";
import { addCountryCode } from "@/06-shared/utils";

export const getAdminsRequest = async (filters?: RestaurantAdminParameters): Promise<CommonGetResponse<RestaurantAdmin[]>> => {
  const res = await baseApi.get<CommonGetResponse<RestaurantAdmin[]>>("/admins", { params: filters });
  return res.data;
};

export const deleteAdminRequest = async (id: number) => {
  const res = await baseApi.delete(`/admins/${id}`);
  return res.data;
};

export const createAdminRequest = async (data: Omit<RestaurantAdmin, "id" | "restaurant_name">): Promise<RestaurantAdmin> => {
  const newData = { ...data, phone_number: addCountryCode(data.phone_number) };
  const res = await baseApi.post<RestaurantAdmin>("/admins", newData);
  return res.data;
};

export const updateAdminRequest = async (
  id: number,
  data: Partial<Omit<RestaurantAdmin, "id" | "restaurant_name">>
) : Promise<RestaurantAdmin> => {
  const newData = data.phone_number ? { ...data, phone_number: addCountryCode(data.phone_number)} : data;
  const res = await baseApi.patch<RestaurantAdmin>(`/admins/${id}`, newData);
  return res.data;
};

export const updatePasswordAdminRequest = async (id: number, data: UpdatePasswordType) : Promise<RestaurantAdmin> => {
  const res = await baseApi.patch<RestaurantAdmin>(`/admins/${id}`, data);
  return res.data;
};

