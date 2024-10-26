"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tableColumns } from "./tableColumns";

export function TableLoadingShimmer() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHead key={column.id}>
                <div className="flex items-center space-x-2">
                  <span>{column.header}</span>
                </div>
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableColumns.map((column) => (
                <TableCell key={column.id}>
                  <div className="animate-pulse">
                    <div className="h-4 w-full max-w-[120px] rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </TableCell>
              ))}
              <TableCell>
                <div className="animate-pulse">
                  <div className="h-8 w-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
