import type { Reservation } from "../model/types";
import { hasReservationEnded } from "./hasReservationEnded";

export const getNextReservationByTable = (
  todaysReservations: Reservation[],
): Record<number, Reservation | undefined> => {
  const activeReservations = todaysReservations.filter(
    (reservation) =>
      reservation.status !== "cancelled" &&
      reservation.status !== "completed" &&
      !hasReservationEnded(reservation),
  );
  activeReservations.sort((a, b) =>
    a.reservation_time.localeCompare(b.reservation_time),
  );

  const nextReservationByTable: Record<number, Reservation | undefined> = {}

  for (const reservation of activeReservations) {
    if (!nextReservationByTable[reservation.table.id]) {
        nextReservationByTable[reservation.table.id] = reservation;
    }
  }
  
  return nextReservationByTable;
};
