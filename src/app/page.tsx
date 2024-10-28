"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToOrders = () => {
    router.push("/orders");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
      <p className="mt-2 max-w-md text-center text-lg text-gray-700">
        Welcome to the Order Status Tracker! Here you can efficiently manage
        your orders and track their status in real time.
      </p>
      <button
        onClick={navigateToOrders}
        className="mt-6 rounded-lg bg-purple-600 px-6 py-3 text-white transition-all duration-200 hover:bg-purple-500 hover:shadow-lg"
      >
        Go to Orders
      </button>
    </main>
  );
}
