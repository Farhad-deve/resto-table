import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setTokens } from "@/05-entities/user";

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
