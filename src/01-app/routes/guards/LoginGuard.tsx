import { homeByRole, useMe } from "@/05-entities/user";
import { selectAccessToken } from "@/05-entities/user";
import { LoadingPage } from "@/02-pages/Loading";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export const LoginGuard = () => {
  const { data: user, isPending, isError } = useMe();
  const accessToken = useSelector(selectAccessToken);

  if (!accessToken) return <Outlet />;

  if (isPending) return <LoadingPage />;

  if (isError) return <Outlet />; // Outlet for now

  if (user?.role) return <Navigate to={homeByRole[user.role]} replace />;
};
