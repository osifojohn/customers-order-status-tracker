import { type FulfillmentStatus } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import type { FilterState, PaginationState } from "@/types";

export function useTableParams() {
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const search = searchParams.get("search") ?? "";
  const status = (searchParams.get("status") as FulfillmentStatus) ?? undefined;
  const sortBy =
    (searchParams.get("sortBy") as "createdAt" | "totalAmount" | "status") ??
    undefined;
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | undefined;
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const initialFilters: FilterState = {
    search,
    status,
    dateRange:
      startDate && endDate
        ? { from: new Date(startDate), to: new Date(endDate) }
        : undefined,
  };

  const initialPagination: PaginationState = {
    pageIndex: page - 1,
    pageSize: limit,
  };

  const initialSorting = [
    sortBy && sortOrder ? { id: sortBy, desc: sortOrder === "desc" } : null,
  ].filter(Boolean);

  return {
    initialFilters,
    initialPagination,
    initialSorting,
  };
}
