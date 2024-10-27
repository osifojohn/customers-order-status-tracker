import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortButtonProps {
  column: any;
  children: React.ReactNode;
}

export const SortButton = ({ column, children }: SortButtonProps) => {
  const isSorted = column.getIsSorted();

  return (
    <div className="flex items-center space-x-2">
      <span>{children}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isSorted ? (
              isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className="flex items-center space-x-2"
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            <span>
              {column.id === "totalAmount" ? "Lowest first" : "A to Z"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className="flex items-center space-x-2"
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            <span>
              {column.id === "totalAmount" ? "Highest first" : "Z to A"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
