import { type FulfillmentStatus } from "@prisma/client";

const statusColors: Record<FulfillmentStatus, string> = {
  PENDING: "text-yellow-800",
  PROCESSING: "text-blue-800",
  SHIPPED: "text-green-800",
  CANCELLED: "text-red-800",
  DELIVERED: "text-blue-500",
};

export const StatusCell = ({ status }: { status: FulfillmentStatus }) => (
  <div
    className={`bg-transparent text-xs uppercase ${statusColors[status] ?? "bg-gray-100"}`}
  >
    {status}
  </div>
);
