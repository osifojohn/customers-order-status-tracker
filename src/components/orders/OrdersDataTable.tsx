"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { api } from "@/trpc/react";
import type {
  FilterState,
  OrdersOutput,
  PaginationState,
  SortingState,
} from "@/types";

import { PaginationControls } from "../pagination/PaginationControls";
import { tableColumns } from "./tableColumns";
import { DataTableFilters } from "./DataTableFilters";
import { TableLoadingShimmer } from "./TableLoadingShimmer";

interface OrdersDataTableProps {
  initailOrders: OrdersOutput;
}
export function OrdersDataTable({ initailOrders }: OrdersDataTableProps) {
  const router = useRouter();
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    status: undefined,
    dateRange: undefined,
  });

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const ordersQuery = api.order.getAllCustomerOrders.useQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: filters.status,
    search: filters.search || undefined,
    dateRange: filters.dateRange,
    sortBy: sorting.sortBy,
    sortOrder: sorting.sortOrder,
  });

  const data = ordersQuery.data?.items ?? [];
  const totalPages = ordersQuery.data?.pagination.totalPages ?? 0;
  const totalItems = ordersQuery.data?.pagination.totalItems ?? 0;

  const handleSortingChange = (column: string) => {
    setSorting((current) => ({
      sortBy: column,
      sortOrder:
        current.sortBy === column && current.sortOrder === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="space-y-4">
      <DataTableFilters
        filters={filters}
        setFilters={setFilters}
        pagination={pagination}
        setPagination={setPagination}
      />

      {ordersQuery.isPending ? (
        <TableLoadingShimmer />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {tableColumns.map((column) => (
                  <TableHead
                    key={column.id}
                    className="cursor-pointer"
                    onClick={() => handleSortingChange(column.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.header}</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                ))}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {tableColumns.map((column) => (
                    <TableCell key={column.id}>
                      {column.cell({ getValue: () => row[column.accessorKey] })}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          disabled
                          onClick={() => router.push(`/orders/${row.id}`)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>Edit Order</DropdownMenuItem>
                        <DropdownMenuItem disabled className="text-red-600">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <PaginationControls
        pagination={pagination}
        totalItems={totalItems}
        totalPages={totalPages}
        onPaginationChange={setPagination}
      />
    </div>
  );
}
