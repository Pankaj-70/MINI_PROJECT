import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../redux/slices/orderSlice";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `/api/v1/order/getOrder/${userId}`,
          {},
          { withCredentials: true }
        );
        const data = response.data.rets.orders;
        dispatch(setOrders(data));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div
      className="p-8 pt-24 min-h-screen"
      style={{
        background: "radial-gradient(circle, #f5f5f5, #e0e0e0, #c7c7c7)",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        My Orders
      </h1>
      {loading ? (
        <div className="text-center text-gray-600">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You have no orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-400 shadow-lg">
            <thead>
              <tr className="bg-blue-200">
                <th className="border px-4 py-2 text-blue-800">Order ID</th>
                <th className="border px-4 py-2 text-blue-800">Date</th>
                <th className="border px-4 py-2 text-blue-800">Items</th>
                <th className="border px-4 py-2 text-blue-800">Total</th>
                <th className="border px-4 py-2 text-blue-800">Status</th>
                <th className="border px-4 py-2 text-blue-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-50 transition-all even:bg-white odd:bg-gray-100"
                >
                  <td className="text-center align-top border px-4 py-2 text-gray-700">
                    #{order._id}
                  </td>
                  <td className="text-center align-top border px-4 py-2 text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 text-gray-700">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.productId?.name || "Product Name"} x{" "}
                        {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="flex justify-center items-center border px-4 py-2 text-gray-700">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td
                    flex
                    justify-center
                    className={`align-top text-center border px-4 py-2 font-semibold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Completed"
                          ? "text-green-600"
                          : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="flex justify-center border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => alert(`Viewing order ${order._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 ml-2 rounded hover:bg-green-600 transition"
                      onClick={() => alert(`Reordering ${order._id}`)}
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
