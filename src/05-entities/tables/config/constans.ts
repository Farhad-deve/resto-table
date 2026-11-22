import type { TableDisplayState } from "../model/types";

type TableLook = { bgColor: string; color: string; statusName: string };

export const tableLook: Record<TableDisplayState, TableLook> = {
  free: { bgColor: "#e6fcf5", color: "#087f5b", statusName: "Свободен" },
  occupied: { bgColor: "#fff0f0", color: "#c92a2a", statusName: "Занят" },
  reserved: { bgColor: "#f3f0ff", color: "#6741d9", statusName: "Бронь" },
};
