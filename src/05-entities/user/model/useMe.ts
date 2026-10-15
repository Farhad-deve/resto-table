import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../api/userApi";
import { useSelector } from "react-redux";
import { selectAccessToken } from "./authSlice";

export const useMe = () => {
  const accessToken = useSelector(selectAccessToken);

  return useQuery({
    enabled: Boolean(accessToken),
    retry: false,
    queryKey: ["me"],
    queryFn: () => getMeRequest(),
  });
};
