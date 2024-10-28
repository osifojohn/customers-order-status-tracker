import { useSearchParams } from "next/navigation";
import { DEFAULT_FILTERS } from "@/components/orders/DataTableFilters";
import type { FilterState, PaginationState } from "@/types";
import { type FulfillmentStatus } from "@prisma/client";
import type { SortingState } from "@tanstack/react-table";

type SortField = "createdAt" | "totalAmount" | "status";

export function useTableParams() {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const search = searchParams.get("search") ?? DEFAULT_FILTERS.search;
  const status =
    (searchParams.get("status") as FulfillmentStatus) ?? DEFAULT_FILTERS.status;
  const sortBy = searchParams.get("sortBy") as SortField | null;
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | null;

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const dateRange =
    startDate && endDate
      ? { from: new Date(startDate), to: new Date(endDate) }
      : DEFAULT_FILTERS.dateRange;

  const initialFilters: FilterState = {
    search,
    status,
    dateRange,
  };

  const initialPagination: PaginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  const initialSorting: SortingState =
    sortBy && sortOrder ? [{ id: sortBy, desc: sortOrder === "asc" }] : [];

  return {
    initialFilters,
    initialPagination,
    initialSorting,
  };
}
