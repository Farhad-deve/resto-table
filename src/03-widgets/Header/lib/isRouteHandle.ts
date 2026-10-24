import type { RouteHandle } from "../model/types";

export const isRouteHandle = (value: unknown): value is RouteHandle =>
  typeof value === "object" &&
  value !== null &&
  "breadcrumb" in value &&
  typeof value.breadcrumb === "string" &&
  "category" in value &&
  typeof value.category === "string"
