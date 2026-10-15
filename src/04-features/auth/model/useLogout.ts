import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../api/authApi";
import { logout } from "@/05-entities/user";
import { selectRefreshToken } from "@/05-entities/user";

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const refreshToken = useSelector(selectRefreshToken);

  return useMutation({
    mutationFn: () =>
      logoutRequest({ refresh: refreshToken ? refreshToken : "" }),
    onSettled: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });
};
