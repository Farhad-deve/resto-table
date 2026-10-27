import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRestaurantRequest } from "../api/restaurantApi";

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (restaurantId: number) => deleteRestaurantRequest(restaurantId),
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
