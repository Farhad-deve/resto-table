import type { PaginatedResponse } from "@/06-shared/model";
import type { Order, OrderParams } from "../model/types";
import { baseApi } from "@/06-shared/api";

export const getOrdersRequest = async (
  id: number,
  filters?: OrderParams,
): Promise<PaginatedResponse<Order[]>> => {
  const res = await baseApi.get<PaginatedResponse<Order[]>>(
    `/restaurants/${id}/orders`,
    { params: filters },
  );
  return res.data;
};
