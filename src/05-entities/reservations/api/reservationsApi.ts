import type { PaginatedResponse } from "@/06-shared/model";
import type { Reservation, ReservationParams } from "../model/types";
import { baseApi } from "@/06-shared/api";

export const getReservationsRequest = async (filters?: ReservationParams): Promise<PaginatedResponse<Reservation[]>> => {
  const res = await baseApi.get<PaginatedResponse<Reservation[]>>("/reservations", { params: filters });
  return res.data;
};
