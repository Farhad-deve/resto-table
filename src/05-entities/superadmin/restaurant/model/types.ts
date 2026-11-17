export interface SuperA_Stats {
  total: number;
  active: number;
  inactive: number;
  without_admin: number;
}

interface Admin {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  is_active: boolean;
  start_time: string;
  end_time: string;
}

export interface RestaurantWithAdmin extends Restaurant {
  admin: Admin | null;
}

export interface RestaurantParameters {
  search?: string;
  is_active?: boolean;
  page?: number;
}

export interface CreateRestaurant {
  name: string;
  address: string;
  phone: string;
  is_active?: boolean;
  start_time: string;
  end_time: string;
}
