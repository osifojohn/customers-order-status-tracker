import { OrdersDataTable } from "@/components/orders/OrdersDataTable";
import { api } from "@/trpc/server";

export default async function OrdersPage() {
  const orders = await api.order.getAllCustomerOrders({});

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 pb-14 sm:px-6 lg:px-8">
      <div className="flex flex-col pb-8 pt-16">
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Order Management
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 sm:mt-4 sm:text-lg lg:leading-loose">
          Track and manage all customer orders in one place. Use advanced
          filtering options to filter by order ID, customer details, or shipping
          information. Filter by date range and order status to get precise
          insights.
        </p>
      </div>

      <OrdersDataTable initailOrders={orders} />
    </main>
  );
}
