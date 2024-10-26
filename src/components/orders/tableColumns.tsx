import { format } from "date-fns";

import { type OrdersOutput, type Customer } from "@/types";
import { type Address } from "@prisma/client";

interface Column {
  id: string;
  header: string;
  accessorKey: keyof OrdersOutput["items"][0];
  cell: (props: { getValue: () => unknown }) => React.ReactNode;
  filterFn?: string;
}

const statusColors: Record<OrdersOutput["items"][0]["status"], string> = {
  PENDING: "text-yellow-800",
  PROCESSING: "text-blue-800",
  SHIPPED: "text-green-800",
  CANCELLED: "text-red-800",
  DELIVERED: "text-blue-500",
};

export const tableColumns: Column[] = [
  {
    id: "orderId",
    header: "Order ID",
    accessorKey: "id",
    cell: (row) => (
      <span className="font-medium">{row.getValue() as string}</span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    accessorKey: "customer",
    cell: (row) => {
      const customer = row.getValue() as Customer;
      return (
        <div>
          <div className="font-medium">{customer.name}</div>
          <div className="text-sm text-gray-500">{customer.email}</div>
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const status = row.getValue() as OrdersOutput["items"][0]["status"];
      return (
        <div
          className={`bg-transparent text-xs uppercase ${statusColors[status] ?? "bg-gray-100"}`}
        >
          {status}
        </div>
      );
    },
    filterFn: "equals",
  },
  {
    id: "totalAmount",
    header: "Total Amount",
    accessorKey: "totalAmount",
    cell: (row) => (
      <span className="font-medium">${Number(row.getValue()).toFixed(2)}</span>
    ),
  },
  {
    id: "shippingAddress",
    header: "Shipping Address",
    accessorKey: "shippingAddress",
    cell: (row) => {
      const shippingAddress = row.getValue() as Address;
      return (
        <div>
          <div className="text-sm text-gray-500">
            Street: {shippingAddress.street}
          </div>
          <div className="text-sm text-gray-500">
            City: {shippingAddress.city}
          </div>
          <div className="text-sm text-gray-500">
            State: {shippingAddress.state}
          </div>
          <div className="text-sm text-gray-500">
            Country: {shippingAddress.country}
          </div>
        </div>
      );
    },
  },
  {
    id: "createdAt",
    header: "Created At",
    accessorKey: "createdAt",
    cell: (row) => format(new Date(row.getValue() as string), "PPP"),
  },
];
