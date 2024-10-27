import { type User } from "@prisma/client";

export const CustomerCell = ({ customer }: { customer: User }) => (
  <div>
    <div className="font-medium">{customer.name}</div>
    <div className="text-sm text-gray-500">{customer.email}</div>
  </div>
);
