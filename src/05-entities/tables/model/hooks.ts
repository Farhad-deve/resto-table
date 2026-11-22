import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTableRequest,
  deleteTableRequest,
  getTablesRequest,
  updateTableRequest,
} from "../api/tablesApi";
import type { CreateTable, TableParams, UpdateTable } from "./types";
import { getCurrentTime, getTodayDate } from "@/06-shared/utils";

export const useTables = (id: number, tablesParams?: TableParams) => {
  const params = {
    date: getTodayDate(),
    time: getCurrentTime(),
    ...tablesParams,
  };
  return useQuery({
    queryKey: ["tables", id, tablesParams],
    queryFn: () => getTablesRequest(id, params),
  });
};

export const useCreateTable = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTable) => createTableRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables", id] });
    },
  });
};

export const useUpdateTable = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<UpdateTable>) => updateTableRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTableRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
};
