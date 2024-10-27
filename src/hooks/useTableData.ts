import { api } from "@/trpc/react";
import type { FilterState, OrdersOutput, PaginationState } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";

interface UseTableDataProps {
  filters: FilterState;
  pagination: PaginationState;
  sorting: Array<{ id: string; desc: boolean }>;
  initialData: OrdersOutput;
}

export function useTableData({
  filters,
  pagination,
  sorting,
  initialData,
}: UseTableDataProps) {
  const utils = api.useUtils();
  const debouncedSearch = useDebounce(filters.search, 300);

  const queryKeyValue = React.useMemo(
    () => ({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      search: debouncedSearch,
      status: filters.status,
      dateRange: filters.dateRange,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc,
    }),
    [
      pagination.pageIndex,
      pagination.pageSize,
      debouncedSearch,
      filters.status,
      filters.dateRange,
      sorting,
    ],
  );

  const ordersQuery = api.order.getAllCustomerOrders.useQuery(
    {
      ...queryKeyValue,
      sortOrder: queryKeyValue.sortOrder ? "asc" : "desc",
    },
    {
      placeholderData: initialData,
    },
  );

  React.useEffect(() => {
    if (pagination.pageIndex > 1) {
      void utils.order.getAllCustomerOrders.prefetch({
        ...queryKeyValue,
        sortOrder: queryKeyValue.sortOrder ? "asc" : "desc",
      });
    }
  }, [pagination.pageIndex, queryKeyValue, utils]);

  return {
    data: ordersQuery.data?.items ?? [],
    totalPages: ordersQuery.data?.pagination.totalPages ?? 0,
    totalItems: ordersQuery.data?.pagination.totalItems ?? 0,
    isLoading: ordersQuery.isPending,
    isError: ordersQuery.isError,
    error: ordersQuery.error,
  };
}
