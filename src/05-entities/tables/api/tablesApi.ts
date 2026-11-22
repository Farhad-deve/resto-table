import type { PaginatedResponse } from "@/06-shared/model";
import type {
  CreateTable,
  Table,
  TableParams,
  UpdateTable,
} from "../model/types";
import { baseApi } from "@/06-shared/api";

export const getTablesRequest = async (
  id: number,
  filters?: TableParams,
): Promise<PaginatedResponse<Table[]>> => {
  const res = await baseApi.get<PaginatedResponse<Table[]>>(
    `/restaurants/${id}/tables`,
    { params: filters },
  );
  return res.data;
};

export const createTableRequest = async (
  id: number,
  data: CreateTable,
): Promise<Table> => {
  const res = await baseApi.post<Table>(`/restaurants/${id}/tables`, data);
  return res.data;
};

export const updateTableRequest = async (
  id: number,
  data: Partial<UpdateTable>,
): Promise<Table> => {
  const newData = { ...data, number: Number(data.number) };
  const res = await baseApi.patch(`/tables/${id}`, newData);
  return res.data;
};

export const deleteTableRequest = async (id: number) => {
  const res = await baseApi.delete(`/tables/${id}`);
  return res.data;
};
