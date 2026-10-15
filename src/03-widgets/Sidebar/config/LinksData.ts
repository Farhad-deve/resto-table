import {
  Shield,
  Store,
  LayoutDashboard,
  Armchair,
  ReceiptText,
  CalendarDays,
  Utensils,
  ShelvingUnit,
  Users,
  IdCard,
  Download
} from "lucide-react";

export const SuperAdminLinks = [
  { id: 1, label: "Рестораны", path: "/super-admin/restaurants", icon: Store },
  { id: 2, label: "Администраторы", path: "/super-admin/admins", icon: Shield },
];

export const RestaurantAdminLinks = [
  { id: 1, category: "Зал", label: "Обзор", path: "/admin/review", icon: LayoutDashboard },
  { id: 2, category: "Зал", label: "Столы", path: "/admin/tables", icon: Armchair },
  { id: 3, category: "Зал", label: "Заказы", path: "/admin/orders", icon: ReceiptText },
  { id: 4, category: "Зал", label: "Брони", path: "/admin/reservations", icon: CalendarDays },
  { id: 6, category: "Управление", label: "Меню", path: "/admin/menu", icon: Utensils },
  { id: 7, category: "Управление", label: "Склад", path: "/admin/storage", icon: ShelvingUnit },
  { id: 8, category: "Управление", label: "Клиенты", path: "/admin/customers", icon: Users },
  { id: 9, category: "Управление", label: "Сотрудники", path: "/admin/employees", icon: IdCard },
];

export const StoreKeeperLinks = [
  { id: 1, label: "Обзор", path: "/storage/review", icon: LayoutDashboard },
  { id: 2, label: "Остатки", path: "/storage/remains", icon: ShelvingUnit },
  { id: 3, label: "Приход", path: "/storage/income", icon: Download },
];
