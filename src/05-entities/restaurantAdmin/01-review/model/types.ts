export interface RestAdminStats {
  tables: Tables;
  orders: Orders;
  reservations: Reservations;
  stock: Stock;
  menu: Menu;
}

export interface RestAdminStatsParams {
  since: string;
  date: string;
}

export interface Tables {
  total: number;
  occupied: number;
  free: number;
}

export interface Orders {
  open_count: number;
  open_total: string;
  closed_today_count: number;
  revenue_today: string;
  revenue_cash: string;
  revenue_card: string;
}

export interface Reservations {
  pending: number;
  today: number;
}

export interface Stock {
  out_count: number;
  low_count: number;
  out_names: string[];
  low_names: string[];
}

export interface Menu {
  stop_count: number;
  stop_names: string[];
}
