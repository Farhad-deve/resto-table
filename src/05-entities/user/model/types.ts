export type Role = "superadmin" | "restaurant_admin" | "storekeeper" | "waiter" | "cook" | "customer";

export const homeByRole: Record<Role, string> = {
    superadmin: "/super-admin/restaurants",
    restaurant_admin: "/admin/review",
    storekeeper: "/storage/review",
    waiter: "/waiter",
    cook: "/kitchen",
    customer: "/customer",
};

export interface WhichRestaurant {
    id: number;
    name: string;
};

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string | null;
    role: Role;
    restaurant: WhichRestaurant | null;
};

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface UpdateMe {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string | null;
}
