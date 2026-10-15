import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/authApi";

export const useRegister = (switchToLogin: () => void) => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => { switchToLogin() },
  });
};
