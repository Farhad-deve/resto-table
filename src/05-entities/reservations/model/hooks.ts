import { useQuery } from "@tanstack/react-query";
import { getReservationsRequest } from "../api/reservationsApi";
import type { ReservationParams } from "./types";

export const useReservations = (params?: ReservationParams) => {
  return useQuery({
    queryKey: ["reservations", params],
    queryFn: () => getReservationsRequest(params),
  });
};
