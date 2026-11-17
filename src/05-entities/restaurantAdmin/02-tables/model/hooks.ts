import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTableRequest, getTablesRequest } from "../api/tablesApi";
import type { CreateTable, TableParams } from "./types";

export const useTables = (id: number, tablesParams?: TableParams) => {
  return useQuery({
    queryKey: ["tables", id, tablesParams],
    queryFn: () => getTablesRequest(id, tablesParams),
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
