import React from "react";
import { Button } from "@/components/ui/button";
import { type PaginationState } from "@/types";

interface PaginationControlsProps {
  pagination: PaginationState;
  totalItems: number;
  totalPages: number;
  isDataLoading: boolean;
  isError: boolean;
  onPaginationChange: (newPagination: PaginationState) => void;
}

type PaginationItem = number | "...";

export function PaginationControls({
  pagination,
  totalItems,
  totalPages,
  isDataLoading = false,
  isError = false,
  onPaginationChange,
}: PaginationControlsProps) {
  const currentPageIndex = pagination.pageIndex;
  const itemsPerPage = pagination.pageSize;

  const generatePaginationNumbers = (): PaginationItem[] => {
    const currentDisplayPage = currentPageIndex + 1;
    const visiblePagesRadius = 2;
    const pageNumbers: number[] = [];
    const paginationItems: PaginationItem[] = [];
    let lastAddedPage: number | undefined;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      if (
        pageNum === 1 ||
        pageNum === totalPages ||
        (pageNum >= currentDisplayPage - visiblePagesRadius &&
          pageNum <= currentDisplayPage + visiblePagesRadius)
      ) {
        pageNumbers.push(pageNum);
      }
    }

    for (const pageNum of pageNumbers) {
      if (lastAddedPage) {
        if (pageNum - lastAddedPage === 2) {
          paginationItems.push(lastAddedPage + 1);
        } else if (pageNum - lastAddedPage !== 1) {
          paginationItems.push("...");
        }
      }
      paginationItems.push(pageNum);
      lastAddedPage = pageNum;
    }

    return paginationItems;
  };

  const startItemIndex = currentPageIndex * itemsPerPage + 1;

  const endItemIndex = Math.min(
    (currentPageIndex + 1) * itemsPerPage,
    totalItems,
  );

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {startItemIndex} to {endItemIndex} of {totalItems} entries
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPaginationChange({ ...pagination, pageIndex: 0 })}
          disabled={currentPageIndex === 0 || isDataLoading  || isError}
        >
          ⟪
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: currentPageIndex - 1,
            })
          }
          disabled={currentPageIndex === 0 || isDataLoading || isError}
        >
          ‹
        </Button>
        {generatePaginationNumbers().map((pageItem, index) => (
          <React.Fragment key={index}>
            {pageItem === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <Button
                variant={
                  currentPageIndex === pageItem - 1 ? "default" : "outline"
                }
                size="sm"
                onClick={() =>
                  onPaginationChange({
                    ...pagination,
                    pageIndex: pageItem - 1,
                  })
                }
                disabled={isDataLoading || isError}
              >
                {pageItem}
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
              pageIndex: currentPageIndex + 1,
            })
          }
          disabled={
            currentPageIndex === totalPages - 1 || isDataLoading || isError
          }
        >
          ›
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onPaginationChange({
              ...pagination,
              pageIndex: totalPages - 1,
            })
          }
          disabled={
            currentPageIndex === totalPages - 1 || isDataLoading || isError
          }
        >
          ⟫
        </Button>
      </div>
    </div>
  );
}
