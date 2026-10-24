import { useQuery } from "@tanstack/react-query";
import { getSuperA_StatsRequest } from "../api/restaurantApi";

export const useSuperAStats = () => {
  return useQuery({
    queryKey: ["superA_Stats"],
    queryFn: () => getSuperA_StatsRequest(),
  });
};
