import type { TableFormData } from "@/04-features/tables/model/schemas";
import type { Table } from "@/05-entities/tables";

export const tableToFormValues = (table: Table): Partial<TableFormData> => {
  return {
    number: String(table.number),
    seats: table.seats,
  };
};
