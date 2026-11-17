import { skipToken, useQuery } from "@tanstack/react-query";
import { getRestAdminStatsRequest } from "../api/reviewApi";
import type { RestAdminStatsParams } from "./types";

export const useRestAdminStats = (id: number | undefined, canIRun: boolean, restAdminParams?: RestAdminStatsParams) => {
  return useQuery({
    queryKey: ["restAdminStats", id, restAdminParams],
    enabled: canIRun,
    queryFn: id !== undefined ? () => getRestAdminStatsRequest(id, restAdminParams) : skipToken,
  });
};