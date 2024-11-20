import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from backend API
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders"); // Replace with your API endpoint
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchOrders();
  }, []);

  return (
    <div className="p-8 pt-24">
      <h1 className="text-2xl font-bold text-center mb-4">My Orders</h1>
      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <p>You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{order.id}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {order.items.map((item) => (
                      <div key={item.id}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border px-4 py-2">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => alert(`Viewing order ${order.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 ml-2 rounded hover:bg-green-600"
                      onClick={() => alert(`Reordering ${order.id}`)}
                    >
                      Reorder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
