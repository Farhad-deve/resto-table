export type Role = "superAdmin" | "admin" | "storekeeper" | "waiter" | "chef" | "klient";

export interface User {
    id: number;
    user_first_name: string;
    user_last_name: string;
    user_phone_number: string;
    email: string;
    role: Role
}

