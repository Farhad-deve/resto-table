export interface Order {
  id: number;
  restaurant: number;
  waiter: number;
  waiter_name: string;
  table: number;
  table_number: number;
  status: string;
  payment_method: string;
  created_at: string;
  closed_at: any;
  order_items: OrderItem[];
  total_order_price: string;
}

export interface OrderItem {
  id: number;
  order: number;
  dish: string;
  dish_price: string;
  quantity: number;
  status: string;
  note: any;
  total_price: string;
}

export interface OrderParams {
  status?: "open" | "closed";
  table?: number;
  page?: number;
  mine?: boolean;
}

