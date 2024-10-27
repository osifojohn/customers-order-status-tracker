import React from "react";
import { Button } from "@/components/ui/button";
import { type PaginationState } from "@/types";

interface PaginationControlsProps {
  pagination: PaginationState;
  totalItems: number;
  totalPages: number;
  isDataLoading: boolean;
  onPaginationChange: (newPagination: PaginationState) => void;
}

export function PaginationControls({
  pagination,
  totalItems,
  totalPages,
  isDataLoading,
  onPaginationChange,
}: PaginationControlsProps) {
  const currentPage = pagination.pageIndex;
  const pageSize = pagination.pageSize;

  const generatePaginationNumbers = () => {
    const current = currentPage + 1;
    const total = totalPages;
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {currentPage * pageSize + 1} to{" "}
        {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems}{" "}
        entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginationChange({ ...pagination, pageIndex: 0 })}
          disabled={currentPage === 0}
        >
          ⟪
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: currentPage - 1,
            })
          }
          disabled={currentPage === 0}
        >
          ‹
        </Button>
        {generatePaginationNumbers().map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <Button
                disabled={isDataLoading}
                variant={currentPage === pageNumber - 1 ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  onPaginationChange({
                    ...pagination,
                    pageIndex: (pageNumber as number) - 1,
                  })
                }
              >
                {pageNumber}
              </Button>
            )}
          </React.Fragment>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: currentPage + 1,
            })
          }
          disabled={currentPage === totalPages - 1 || isDataLoading}
        >
          ›
        </Button>
        <Button
          disabled={isDataLoading}
          variant="outline"
          size="sm"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: totalPages - 1,
            })
          }
          disabled={currentPage === totalPages - 1 || isDataLoading}
        >
          ⟫
        </Button>
      </div>
    </div>
  );
}
