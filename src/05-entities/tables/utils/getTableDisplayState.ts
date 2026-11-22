import type { Table, TableDisplayState } from "../model/types"

export const getTableDisplayState = (status: Table["status"], isReserved: boolean): TableDisplayState => {
    if (status === "occupied") return "occupied";
    if (isReserved) return "reserved";
    return "free";
}
