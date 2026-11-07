import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest, logoutRequest, registerRequest } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setTokens, logout, selectRefreshToken } from "@/05-entities/user";

export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (tokens) => {
      dispatch(setTokens(tokens));
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const refreshToken = useSelector(selectRefreshToken);

  return useMutation({
    mutationFn: () => logoutRequest({ refresh: refreshToken ? refreshToken : "" }),
    onMutate: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });
};

export const useRegister = (switchToLogin: () => void) => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => { switchToLogin() },
  });
};
