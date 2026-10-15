import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import { LogRegPage } from "@/02-pages/auth";
import { AdminPanelLayout } from "../layouts";
import { SuperAdminRestaurantsPage } from "@/02-pages/superAdmin";
import { SuperAdminAdminsPage } from "@/02-pages/superAdmin";
import { LoginGuard } from "./guards/LoginGuard";
import { NotFoundPage } from "@/02-pages/NotFound";
import {
  AdminEmployeesPage,
  AdminMenuPage,
  AdminOrdersPage,
  AdminReservationsPage,
  AdminReviewPage,
  AdminStoragePage,
  AdminTablesPage,
  AdminUsersPage,
} from "@/02-pages/restaurantAdmin";
import {
  StorageIncomePage,
  StorageRemainsPage,
  StorageReviewPage,
} from "@/02-pages/storeKeeper";
import { RoleGuard } from "./guards/RoleGuard";

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
              },
              {
                path: "admins",
                element: <SuperAdminAdminsPage />,
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
              },
              {
                path: "tables",
                element: <AdminTablesPage />,
              },
              {
                path: "orders",
                element: <AdminOrdersPage />,
              },
              {
                path: "reservations",
                element: <AdminReservationsPage />,
              },
              {
                path: "menu",
                element: <AdminMenuPage />,
              },
              {
                path: "storage",
                element: <AdminStoragePage />,
              },
              {
                path: "customers",
                element: <AdminUsersPage />,
              },
              {
                path: "employees",
                element: <AdminEmployeesPage />,
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
              },
              {
                path: "remains",
                element: <StorageRemainsPage />,
              },
              {
                path: "income",
                element: <StorageIncomePage />,
              },
            ],
          },
        ],
      },

      // Not found page
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
