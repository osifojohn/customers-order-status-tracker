import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { api } from "@/trpc/server";

export default async function OrdersPage() {
  const orders = await api.order.getAllCustomerOrders({});

  return (
    <div className="px-4 pb-5 pt-20">
      <OrdersDataTable initailOrders={orders} />
    </div>
  );
}
