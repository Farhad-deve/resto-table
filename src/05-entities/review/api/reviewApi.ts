import { baseApi } from "@/06-shared/api";
import type { RestAdminStats, RestAdminStatsParams } from "../model/types";

export const getRestAdminStatsRequest = async (id: number, filters?: RestAdminStatsParams): Promise<RestAdminStats> => {
    const res = await baseApi.get<RestAdminStats>(`/restaurants/${id}/stats`, { params: filters });
    return res.data;
};

