import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMeRequest, updateMeRequest } from "../api/userApi";
import { useSelector } from "react-redux";
import { selectAccessToken } from "./authSlice";
import type { UpdateMe } from "./types";

export const useMe = () => {
  const accessToken = useSelector(selectAccessToken);

  return useQuery({
    enabled: Boolean(accessToken),
    retry: false,
    queryKey: ["me"],
    queryFn: () => getMeRequest(),
  });
};

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMe) => updateMeRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  })
};
