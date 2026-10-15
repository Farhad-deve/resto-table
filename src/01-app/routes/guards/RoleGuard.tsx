import { selectAccessToken, useMe, type Role } from "@/05-entities/user";
import { LoadingPage } from "@/02-pages/Loading";
import { NoAccessPage } from "@/02-pages/NoAccess";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

interface RoleGuardProps {
  allowedRoles: Role[];
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { data: user, isPending, isError } = useMe();
  const accessToken = useSelector(selectAccessToken);

  // Sends to login if no token
  if (!accessToken) return <Navigate to="/login" replace />;

  // Shows loading page if user data is pending
  if (isPending) return <LoadingPage />;

  // Sends to login if user data is error
  if (isError) return <Navigate to="/login" replace />;

  // Sends to NoAccessPage if role is not allowed
  if (!allowedRoles.includes(user.role)) return <NoAccessPage />;

  return <Outlet />;
};
