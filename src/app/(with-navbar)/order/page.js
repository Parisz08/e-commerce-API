"use client";

import { useState, useEffect } from "react";

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulasi API Fetch Orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("http://192.168.10.137:5000");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Gagal mengambil pesanan:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-md">
              <p className="font-semibold">🛍️ Order #{order.id}</p>
              <p>Total: Rp{order.total.toLocaleString()}</p>
              <p
                className={`px-2 py-1 inline-block rounded-md text-white ${
                  order.status === "Diproses"
                    ? "bg-yellow-500"
                    : order.status === "Dikirim"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
