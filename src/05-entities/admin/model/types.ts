export interface RestaurantAdmin {
  id: number;
  restaurant: number;
  restaurant_name: string;
  phone_number: string;
  first_name: string;
  last_name: string;
}

export interface RestaurantAdminParameters {
  page?: number;
}

export interface UpdatePasswordType {
  password: string;
}
