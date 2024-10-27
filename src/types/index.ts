import { type orderRouter } from "@/server/api/routers/order";
import { type FulfillmentStatus } from "@prisma/client";
import { type inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<typeof orderRouter>;
export type OrdersOutput = RouterOutput["getAllCustomerOrders"];
export type Order = OrdersOutput["items"];

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}
export interface FilterState {
  search?: string;
  status?: FulfillmentStatus;
  dateRange?: DateRange;
}

export interface SortingState {
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface Customer {
  name: string;
  email: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
