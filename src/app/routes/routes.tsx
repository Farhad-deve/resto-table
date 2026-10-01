import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import { LogRegPage } from "@/pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,  
      },
      {
        path: "login",
        element: <LogRegPage />,
      },
    //   Here comes other layouts with their pages
    ],
  },
]);
