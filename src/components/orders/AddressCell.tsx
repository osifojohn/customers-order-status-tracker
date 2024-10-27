import { type Address } from "@prisma/client";

export const AddressCell = ({ address }: { address: Address }) => (
  <div>
    <div className="text-sm text-gray-500">Street: {address.street}</div>
    <div className="text-sm text-gray-500">City: {address.city}</div>
    <div className="text-sm text-gray-500">State: {address.state}</div>
    <div className="text-sm text-gray-500">Country: {address.country}</div>
  </div>
);
