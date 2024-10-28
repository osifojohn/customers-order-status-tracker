import { type FulfillmentStatus } from "@prisma/client";

const statusColors: Record<FulfillmentStatus, string> = {
  PENDING: "text-yellow-500",
  PROCESSING: "text-blue-500",
  SHIPPED: "text-green-600",
  CANCELLED: "text-red-600",
  DELIVERED: "text-teal-500",
};

export const StatusCell = ({ status }: { status: FulfillmentStatus }) => (
  <div className={`bg-transparent ${statusColors[status] ?? "bg-gray-100"}`}>
    {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
  </div>
);
