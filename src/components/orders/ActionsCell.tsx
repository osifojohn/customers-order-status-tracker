import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export const ActionsCell = ({ orderId }: { orderId: string }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled
          onClick={() => router.push(`/orders/${orderId}`)}
        >
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Edit Order</DropdownMenuItem>
        <DropdownMenuItem disabled className="text-red-600">
          Cancel Order
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
