export type Role = "SuperAdmin" | "Admin" | "storekeeper" | "waiter" | "chef" | "guest";

export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    role: Role
}

