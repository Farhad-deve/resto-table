import type { Reservation } from "../model/types";

export const hasReservationEnded = (reservation: Reservation, now: Date = new Date): boolean => {
    const theStart = new Date(reservation.reservation_date + "T" + reservation.reservation_time);
    const theDurationInMilliseconds = Number(reservation.duration_hours) * 60 * 60 * 1000;
    const theEndMoment = theStart.getTime() + theDurationInMilliseconds;
    return now.getTime() >= theEndMoment;
};
