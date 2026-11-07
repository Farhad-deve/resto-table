import { baseApi } from "@/06-shared/api";
import type {
  RestaurantParameters,
  SuperA_Stats,
  RestaurantWithAdmin,
  CreateRestaurant,
} from "../model/types";
import type { CommonGetResponse } from "@/06-shared/model";
import { addCountryCode } from "@/06-shared/utils";

export const getSuperA_StatsRequest = async (): Promise<SuperA_Stats> => {
  const res = await baseApi.get<SuperA_Stats>("/restaurants/stats");
  return res.data;
};

export const getRestaurantsRequest = async ( filters?: RestaurantParameters ): Promise<CommonGetResponse<RestaurantWithAdmin[]>> => {
  const res = await baseApi.get<CommonGetResponse<RestaurantWithAdmin[]>>("/restaurants", { params: filters, });
  return res.data;
};

export const deleteRestaurantRequest = async (id: number) => {
  const res = await baseApi.delete(`/restaurants/${id}`);
  return res.data;
};

export const createRestaurantRequest = async (data: CreateRestaurant) : Promise<RestaurantWithAdmin> => {
  const newData = { ...data, phone: addCountryCode(data.phone)}
  const res = await baseApi.post("/restaurants", newData);
  return res.data;
};

export const updateRestaurantRequest = async (id: number, data: Partial<CreateRestaurant>) : Promise<RestaurantWithAdmin> => {
  const newData = data.phone ? { ...data, phone: addCountryCode(data.phone) } : data
  const res = await baseApi.patch<RestaurantWithAdmin>(`/restaurants/${id}`, newData);
  return res.data;
};