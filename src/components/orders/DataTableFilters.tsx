import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import type { DateRange as DayPickerDateRange } from "react-day-picker";
import {
  type FilterState,
  type PaginationState,
  type DateRange,
} from "@/types";
import { type FulfillmentStatus } from "@prisma/client";
import { useDebounce } from "@/hooks/useDebounce";

interface DataTableFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  status: undefined,
  dateRange: undefined,
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50];

export function DataTableFilters({
  filters,
  setFilters,
  pagination,
  setPagination,
}: DataTableFiltersProps) {
  const [isDefault, setIsDefault] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DayPickerDateRange | undefined
  >(
    filters.dateRange
      ? { from: filters.dateRange.from, to: filters.dateRange.to }
      : undefined,
  );

  const debouncedDateRange = useDebounce(selectedDateRange, 200);

  useEffect(() => {
    const hasSearch = filters.search !== DEFAULT_FILTERS.search;
    const hasStatus = filters.status !== DEFAULT_FILTERS.status;
    const hasDateRange = filters.dateRange !== DEFAULT_FILTERS.dateRange;

    setIsDefault(!(hasSearch || hasStatus || hasDateRange));
  }, [filters]);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
  }, [setFilters, setPagination, pagination]);

  const handleDateRangeSelect = (range: DayPickerDateRange | undefined) => {
    setSelectedDateRange(range);
  };

  const handlePageSizeChange = (value: string) => {
    setPagination({
      pageSize: Number(value),
      pageIndex: 0,
    });
  };

  const handleStatusChange = (value: FulfillmentStatus | "all") => {
    setFilters({
      ...filters,
      status: value === "all" ? undefined : value,
    });
    setPagination({
      ...pagination,
      pageIndex: 0,
    });
  };

  useEffect(() => {
    if (debouncedDateRange?.from) {
      const dateRange: DateRange = {
        from: debouncedDateRange.from,
        ...(debouncedDateRange.to && { to: debouncedDateRange.to }),
      };
      setFilters({ ...filters, dateRange });
    } else {
      setFilters({ ...filters, dateRange: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedDateRange]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter by Id, customer name, email, address, state, country, city..."
          value={filters.search}
          onChange={(event) =>
            setFilters({ ...filters, search: event.target.value })
          }
          className="max-w-xl"
        />

        <Select
          value={filters.status ?? "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-[240px] justify-start text-left font-normal ${
                !filters.dateRange && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              selected={selectedDateRange}
              onSelect={handleDateRangeSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-2">
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rows per page" />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          disabled={isDefault}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
