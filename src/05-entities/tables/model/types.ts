export interface Table {
  id: number;
  restaurant: number;
  number: number;
  seats: number;
  status: "free" | "occupied" | "reserved";
}

export interface TableParams {
  status?: string;
  page?: number;
  page_size?: number;
  time?: string;
  date?: string;
  waiter?: string | number;
}

export interface CreateTable {
  number?: number;
  seats: number;
}

export interface UpdateTable {
  number: string;
  seats: number;
}

export type TableDisplayState = "free" | "occupied" | "reserved"