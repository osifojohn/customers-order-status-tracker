"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrdersOutput } from "@/types";
import { DataTableFilters } from "./DataTableFilters";
import { TableLoadingShimmer } from "./TableLoadingShimmer";
import { PaginationControls } from "../pagination/PaginationControls";
import { useTableUrl } from "@/hooks/useTableUrl";
import { tableColumns } from "./tableColumns";
import { useTableParams } from "@/hooks/useOrdersParams";
import { useTableData } from "@/hooks/useTableData";
import ErrorAlert from "../ErrorAlert";

interface OrdersDataTableProps {
  initailOrders: OrdersOutput;
}

export function OrdersDataTable({ initailOrders }: OrdersDataTableProps) {
  const { updateUrl } = useTableUrl();
  const { initialFilters, initialPagination, initialSorting } =
    useTableParams();

  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState(initialPagination);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const { data, totalPages, totalItems, isLoading, isError, error, retry } =
    useTableData({
      filters,
      pagination,
      sorting,
      initialData: initailOrders,
    });

  useEffect(() => {
    updateUrl({
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
      search: filters.search,
      status: filters.status,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? "desc" : "asc",
      startDate: filters.dateRange?.from?.toISOString(),
      endDate: filters.dateRange?.to?.toISOString(),
    });
  }, [filters, pagination, sorting, updateUrl]);

  const columns = useMemo(() => tableColumns, []);

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      sorting,
      pagination,
    },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <div className="space-y-4">
      <DataTableFilters
        filters={filters}
        setFilters={setFilters}
        pagination={pagination}
        setPagination={setPagination}
      />

      {isLoading ? (
        <TableLoadingShimmer />
      ) : isError ? (
        <div className="flex w-full items-start justify-center">
          {" "}
          <ErrorAlert
            message={error?.message ?? "An error occurred while loading data."}
            onRetry={() => retry()}
          />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {table.getFlatHeaders().map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="py-4 text-center"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <PaginationControls
        isError={isError}
        isDataLoading={isLoading}
        pagination={pagination}
        totalItems={totalItems}
        totalPages={totalPages}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
