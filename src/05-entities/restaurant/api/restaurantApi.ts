import { baseApi } from "@/06-shared/api";
import type {
  RestaurantParameters,
  RestaurantList,
  SuperA_Stats,
} from "../model/types";

export const getSuperA_StatsRequest = async (): Promise<SuperA_Stats> => {
  const res = await baseApi.get<SuperA_Stats>("/restaurants/stats");
  return res.data;
};

export const getRestaurantsRequest = async ( filters?: RestaurantParameters ): Promise<RestaurantList> => {
  const res = await baseApi.get<RestaurantList>("/restaurants", { params: filters, });
  return res.data;
};

export const deleteRestaurantRequest = async (id: number) => {
  const res = await baseApi.delete(`/restaurants/${id}`);
  return res.data;
};
