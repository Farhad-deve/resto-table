import { useQuery } from "@tanstack/react-query";
import { getRestaurantsRequest } from "../api/restaurantApi";
import type { RestaurantParameters } from "./types";

export const useRestaurants = (restaurantParams?: RestaurantParameters) => {
  return useQuery({
    queryKey: ["restaurants", restaurantParams],
    queryFn: () => getRestaurantsRequest(restaurantParams),
  });
};
