"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToOrders = () => {
    router.push("/orders");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      <h1 className="text-2xl font-bold text-black">Home Page</h1>
      <button
        onClick={navigateToOrders}
        className="mt-4 rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-500"
      >
        Go to Orders
      </button>
    </main>
  );
}
