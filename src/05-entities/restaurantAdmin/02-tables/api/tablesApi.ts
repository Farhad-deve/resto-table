import type { CommonGetResponse } from "@/06-shared/model";
import type { CreateTable, Table, TableParams } from "../model/types";
import { baseApi } from "@/06-shared/api";

export const getTablesRequest = async (id: number, filters?: TableParams): Promise<CommonGetResponse<Table[]>> => {
  const res = await baseApi.get<CommonGetResponse<Table[]>>(`/restaurants/${id}/tables`, { params: filters });
  return res.data;
};

export const createTableRequest = async (id: number, data: CreateTable): Promise<Table> => {
  const res = await baseApi.post<Table>(`/restaurants/${id}/tables`, data);
  return res.data;
};
