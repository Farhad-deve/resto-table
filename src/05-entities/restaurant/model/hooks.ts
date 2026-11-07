import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createRestaurantRequest,
  deleteRestaurantRequest,
  getRestaurantsRequest,
  getSuperA_StatsRequest,
  updateRestaurantRequest,
} from "../api/restaurantApi";
import type { CreateRestaurant, RestaurantParameters } from "./types";
import { toast } from 'react-toastify';

export const useRestaurants = (restaurantParams?: RestaurantParameters) => {
  return useQuery({
    queryKey: ["restaurants", restaurantParams],
    queryFn: () => getRestaurantsRequest(restaurantParams),
  });
};

export const useSuperAStats = () => {
  return useQuery({
    queryKey: ["superA_Stats"],
    queryFn: () => getSuperA_StatsRequest(),
  });
};

export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRestaurant) => createRestaurantRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["superA_Stats"] });
      toast.success("Ресторан создан · назначьте администратора в разделе «Администраторы»");
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (restaurantId: number) => deleteRestaurantRequest(restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["superA_Stats"] });
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data } : { id: number; data: Partial<CreateRestaurant> }) => updateRestaurantRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurants"],
      });
      queryClient.invalidateQueries({
        queryKey: ["superA_Stats"],
      });
    },
  });
};
