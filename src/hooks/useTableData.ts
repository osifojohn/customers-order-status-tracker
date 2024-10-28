import { api } from "@/trpc/react";
import type { FilterState, OrdersOutput, PaginationState } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect } from "react";
import { type SortingState } from "@tanstack/react-table";

interface UseTableDataProps {
  filters: FilterState;
  pagination: PaginationState;
  initialData: OrdersOutput;
  sorting: SortingState;
}

type SortField = "createdAt" | "totalAmount" | "status";

type QueryParams = {
  page: number;
  limit: number;
  search: string;
  status?: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  dateRange?: { from: Date; to: Date };
  sortBy?: SortField;
  sortOrder: "asc" | "desc";
};

export function useTableData({
  filters,
  pagination,
  sorting,
  initialData,
}: UseTableDataProps) {
  const utils = api.useUtils();
  const debouncedSearch = useDebounce(filters.search, 300);

  const queryKeyValue = React.useMemo<QueryParams>(() => {
    const dateRange =
      filters.dateRange?.from && filters.dateRange.to
        ? {
            from: new Date(filters.dateRange.from),
            to: new Date(filters.dateRange.to),
          }
        : undefined;

    return {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: debouncedSearch,
      status: filters.status,
      dateRange,
      sortBy: sorting[0]?.id as SortField | undefined,
      sortOrder: sorting[0]?.desc ? "desc" : "asc",
    };
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    debouncedSearch,
    filters.status,
    filters.dateRange,
    sorting,
  ]);

  const ordersQuery = api.order.getAllCustomerOrders.useQuery(queryKeyValue, {
    placeholderData: (prev) => prev ?? initialData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (pagination.pageIndex > 0) {
      void utils.order.getAllCustomerOrders.prefetch(queryKeyValue);
    }
  }, [pagination.pageIndex, queryKeyValue, utils]);

  return {
    data: ordersQuery.data?.items ?? initialData.items,
    totalPages:
      ordersQuery.data?.pagination.totalPages ??
      initialData.pagination.totalPages,
    totalItems:
      ordersQuery.data?.pagination.totalItems ??
      initialData.pagination.totalItems,
    isLoading: ordersQuery.isPending,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
    retry: ordersQuery.refetch,
  };
}
