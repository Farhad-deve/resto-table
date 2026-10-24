import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";

import { AdminPanelLayout, CustomerLayout, KitchenLayout, WaiterLayout } from "../layouts";
import { LogRegPage } from "@/02-pages/auth";
import { SuperAdminRestaurantsPage } from "@/02-pages/superAdmin";
import { SuperAdminAdminsPage } from "@/02-pages/superAdmin";
import { NotFoundPage } from "@/02-pages/NotFound";
import {
  AdminEmployeesPage,
  AdminMenuPage,
  AdminOrdersPage,
  AdminReservationsPage,
  AdminReviewPage,
  AdminStoragePage,
  AdminTablesPage,
} from "@/02-pages/restaurantAdmin";
import {
  StorageIncomePage,
  StorageRemainsPage,
  StorageReviewPage,
} from "@/02-pages/storeKeeper";

import { RoleGuard } from "./guards/RoleGuard";
import { LoginGuard } from "./guards/LoginGuard";
import type { RouteHandle } from "@/03-widgets/Header";
import { WaiterOneTablePage, WaiterTablesPage } from "@/02-pages/waiter";
import { CustomerReservationsPage, CustomerRestaurantsPage } from "@/02-pages/customer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },

      // Login
      {
        element: <LoginGuard />,
        children: [
          {
            path: "login",
            element: <LogRegPage />,
          },
        ],
      },

      // Super Admin
      {
        element: <RoleGuard allowedRoles={["superadmin"]} />,
        children: [
          {
            path: "super-admin",
            element: <AdminPanelLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="restaurants" replace />,
              },
              {
                path: "restaurants",
                element: <SuperAdminRestaurantsPage />,
                handle: { category: "Платформа", breadcrumb: "Рестораны" } satisfies RouteHandle,
              },
              {
                path: "admins",
                element: <SuperAdminAdminsPage />,
                handle: { category: "Платформа", breadcrumb: "Администраторы" } satisfies RouteHandle,
              },
            ],
          },
        ],
      },

      // Restaurant Admin
      {
        element: <RoleGuard allowedRoles={["restaurant_admin"]} />,
        children: [
          {
            path: "admin",
            element: <AdminPanelLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="review" replace />,
              },
              {
                path: "review",
                element: <AdminReviewPage />,
                handle: { category: "Зал", breadcrumb: "Обзор" } satisfies RouteHandle,
              },
              {
                path: "tables",
                element: <AdminTablesPage />,
                handle: { category: "Зал", breadcrumb: "Столы" } satisfies RouteHandle,
              },
              {
                path: "orders",
                element: <AdminOrdersPage />,
                handle: { category: "Зал", breadcrumb: "Заказы" } satisfies RouteHandle,
              },
              {
                path: "reservations",
                element: <AdminReservationsPage />,
                handle: { category: "Зал", breadcrumb: "Брони" } satisfies RouteHandle,
              },
              {
                path: "menu",
                element: <AdminMenuPage />,
                handle: { category: "Управление", breadcrumb: "Меню" } satisfies RouteHandle,
              },
              {
                path: "storage",
                element: <AdminStoragePage />,
                handle: { category: "Управление", breadcrumb: "Склад" } satisfies RouteHandle,
              },
              {
                path: "employees",
                element: <AdminEmployeesPage />,
                handle: { category: "Управление", breadcrumb: "Сотрудники" } satisfies RouteHandle,
              },
            ],
          },
        ],
      },

      // Storekeeper
      {
        element: <RoleGuard allowedRoles={["storekeeper"]} />,
        children: [
          {
            path: "storage",
            element: <AdminPanelLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="review" replace />,
              },
              {
                path: "review",
                element: <StorageReviewPage />,
                handle: { category: "Склад", breadcrumb: "Обзор" } satisfies RouteHandle,
              },
              {
                path: "remains",
                element: <StorageRemainsPage />,
                handle: { category: "Склад", breadcrumb: "Остатки" } satisfies RouteHandle,
              },
              {
                path: "income",
                element: <StorageIncomePage />,
                handle: { category: "Склад", breadcrumb: "Приход" } satisfies RouteHandle,
              },
            ],
          },
        ],
      },

      // Waiter
      {
        element: <RoleGuard allowedRoles={["waiter"]} />,
        children: [
          {
            path: "waiter",
            element: <WaiterLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="tables" replace />
              },
              {
                path: "tables",
                element: <WaiterTablesPage />
              },
              {
                path: "tables/:id",
                element: <WaiterOneTablePage />
              }
            ]
          }
        ]
      },

      // Cook
      {
        element: <RoleGuard allowedRoles={["cook"]} />,
        children: [
          {
            path: "kitchen",
            element: <KitchenLayout />
          }
        ]
      },

      // Customer
      {
        element: <RoleGuard allowedRoles={["customer"]} />,
        children: [
          {
            path: "customer",
            element: <CustomerLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="restaurants" replace />
              },
              {
                path: "restaurants",
                element: <CustomerRestaurantsPage />
              },
              {
                path: "reservations",
                element: <CustomerReservationsPage />
              }
            ]
          }
        ]
      },

      // Not found page
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
