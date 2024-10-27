import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FilterState } from "@/types";

interface StatusDropdownProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function StatusDropdown({ filters, setFilters }: StatusDropdownProps) {
  return (
    <Select
      value={filters.status}
      onValueChange={(value) =>
        setFilters((prev) => ({ ...prev, status: value }))
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="PROCESSING">Processing</SelectItem>
        <SelectItem value="DELIVERED">Delivered</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}
