export interface Reservation {
  id: number;
  restaurant: ReservationRestaurant;
  table: ReservationTable;
  client: ReservationClient;
  guests_count: number;
  reservation_date: string;
  reservation_time: string;
  duration_hours: string;
  status: string;
}

export interface ReservationRestaurant {
  id: number;
  name: string;
}

export interface ReservationTable {
  id: number;
  restaurant: number;
  number: number;
}

export interface ReservationClient {
  phone_number: string;
  first_name: string;
  last_name: string;
}

export interface ReservationParams {
  page?: number;
  date: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}
