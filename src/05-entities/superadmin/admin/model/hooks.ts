import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminsRequest, deleteAdminRequest, createAdminRequest, updateAdminRequest, updatePasswordAdminRequest } from "../api/adminApi";
import type { RestaurantAdmin, RestaurantAdminParameters, UpdatePasswordType } from "./types";

export const useAdmins = (adminsParams?: RestaurantAdminParameters) => {
  return useQuery({
    queryKey: ["admins", adminsParams],
    queryFn: () => getAdminsRequest(adminsParams),
  });
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: number) => deleteAdminRequest(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<RestaurantAdmin, "id" | "restaurant_name">) => createAdminRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data } :
      { id: number, data: Partial<Omit<RestaurantAdmin, "id" | "restaurant_name">>}
    ) => updateAdminRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    }
  })
};

export const useUpdatePasswordAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (({ id, data } : { id: number, data: UpdatePasswordType }) => updatePasswordAdminRequest(id, data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] });
    }
  })
};