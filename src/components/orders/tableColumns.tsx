import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SortButton } from "./SortButton";
import { AddressCell } from "./AddressCell";
import { ActionsCell } from "./ActionsCell";
import { CustomerCell } from "./CustomerCell";
import { StatusCell } from "./StatusCell";
import type { OrdersOutput } from "@/types";

type OrderColumn = ColumnDef<OrdersOutput["items"][0]> & {
  accessorKey: string;
};

export const tableColumns: OrderColumn[] = [
  {
    accessorKey: "id",
    header: () => <div>Order ID</div>,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <CustomerCell customer={row.getValue("customer")} />,
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => <StatusCell status={row.getValue("status")} />,
  },
  {
    accessorKey: "orderItems",
    header: () => <div>Products</div>,
    cell: ({ row }) => {
      const { orderItems } = row.original;
      return (
        <div className="space-y-1">
          {orderItems?.map((item) => (
            <div key={item.product.id} className="text-sm">
              {item.product.name} ({item.quantity})
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "orderItems",
    header: () => <div>Total Quantity</div>,
    cell: ({ row }) => {
      const { orderItems } = row.original;
      const totalQuantity = orderItems?.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0,
      );
      return (
        <div className="font-medium">
          <span>{totalQuantity}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <SortButton column={column}>Total Amount</SortButton>
    ),
    cell: ({ row }) => (
      <span className="font-medium">
        ${Number(row.getValue("totalAmount")).toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping Address",
    cell: ({ row }) => (
      <AddressCell address={row.getValue("shippingAddress")} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortButton column={column}>Created At</SortButton>,
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPP"),
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <ActionsCell orderId={row.original.id} />,
  },
];
