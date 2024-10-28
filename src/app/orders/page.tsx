import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { api } from "@/trpc/server";

export default async function OrdersPage() {
  const orders = await api.order.getAllCustomerOrders({});

  return (
    <div className="flex w-full flex-col px-4 pb-5 pt-20">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Customer Orders</h1>
      <OrdersDataTable initailOrders={orders} />
    </div>
  );
}
