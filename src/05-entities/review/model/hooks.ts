import { skipToken, useQuery } from "@tanstack/react-query";
import { getRestAdminStatsRequest } from "../api/reviewApi";
import type { RestAdminStatsParams } from "./types";
import { getStartOfToday, getTodayDate } from "@/06-shared/utils";

export const useRestAdminStats = (
  id: number | undefined,
  enabled: boolean,
  restAdminParams?: RestAdminStatsParams,
) => {
  const params = {
    since: getStartOfToday(),
    date: getTodayDate(),
    ...restAdminParams,
  };
  return useQuery({
    queryKey: ["restAdminStats", id, params],
    enabled: enabled,
    queryFn:
      id !== undefined ? () => getRestAdminStatsRequest(id, params) : skipToken,
  });
};
