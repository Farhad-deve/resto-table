import { useQuery } from "@tanstack/react-query";
import { getOrdersRequest } from "../api/ordersApi";
import type { OrderParams } from "./types";

export const useOrders = (id: number, orderParams?: OrderParams) => {
  return useQuery({
    queryKey: ["orders", id, orderParams],
    queryFn: () => getOrdersRequest(id, orderParams),
  });
};
