import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../redux/slices/orderSlice";
import { IoClose } from "react-icons/io5";
const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const closeView = () => {
    setSelectedOrder(null);
  };

  return (
    <div
      className={`p-8 pt-24 min-h-screen ${
        selectedOrder ? "overflow-hidden" : ""
      }`}
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
                      onClick={() => handleView(order)}
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

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-16 h-[27rem] rounded-full shadow-sm relative border-2 border-purple-800 shadow-white items-center align-middle">
            <button
              className="absolute top-2 right-2 text-white hover:text-gray-300"
              onClick={closeView}
            >
              <IoClose className="text-3xl font-extrabold" />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-200">
              Order Details
            </h2>
            <p className="text-lg">
              <strong className="text-yellow-300">Order ID:</strong> #
              {selectedOrder._id}
            </p>
            <p className="text-lg">
              <strong className="text-yellow-300">Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <p className="text-lg">
              <strong className="text-yellow-300">Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedOrder.status === "Pending"
                    ? "text-yellow-400"
                    : selectedOrder.status === "Completed"
                      ? "text-green-400"
                      : "text-red-400"
                }`}
              >
                {selectedOrder.status}
              </span>
            </p>

            <p className="text-lg mt-4">
              <strong className="text-yellow-300">Items:</strong>
            </p>
            <ul className="list-disc ml-6 text-white">
              {selectedOrder.items.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.productId?.name || "Product Name"} x {item.quantity}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-lg">
              <strong className="text-yellow-300">Total:</strong> ₹
              {selectedOrder.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
