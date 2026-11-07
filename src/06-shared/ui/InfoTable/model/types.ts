import type { ReactNode } from "react";

type HeaderRow = {
  id: number;
  title: string;
};

export interface InfoTableProps {
  bodyRows: ReactNode;
  headerRowsArray: HeaderRow[];
  fromItems: number;
  toItems: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isContentLoading: boolean;
}
