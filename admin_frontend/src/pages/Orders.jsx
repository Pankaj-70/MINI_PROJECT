import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setTotalOrders } from "../redux/order-slice";

const Orders = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ start: "", end: "" });
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "/api/v1/order/getAllOrders",
          {},
          { withCredentials: true }
        );
        const allOrders = response.data.data.flatMap((orderData) =>
          orderData.orders.map((order) => ({
            createdAt: order.createdAt,
            userId: orderData.userId,
            orderId: order._id,
            sendId: orderData._id,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
          }))
        );
        const sortedOrders = allOrders.sort((a, b) => {
          if (a.status === "Completed" || a.status === "Cancelled") {
            return 1;
          }
          if (b.status === "Completed" || b.status === "Cancelled") {
            return -1;
          }
          return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setGroupedOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFilterChange = () => {
    let filtered = [...groupedOrders];

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (dateFilter.start && dateFilter.end) {
      const startDate = new Date(dateFilter.start);
      const endDate = new Date(dateFilter.end);
      filtered = filtered.filter(
        (order) =>
          new Date(order.createdAt) >= startDate &&
          new Date(order.createdAt) <= endDate
      );
    }

    if (priceFilter.min || priceFilter.max) {
      const minPrice = priceFilter.min ? parseFloat(priceFilter.min) : 0;
      const maxPrice = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;
      filtered = filtered.filter(
        (order) =>
          order.totalAmount >= minPrice && order.totalAmount <= maxPrice
      );
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [statusFilter, dateFilter, priceFilter]);

  const handleStatusChange = async (orderId, itemId, newStatus) => {
    try {
      const response = await axios.patch(
        `/api/v1/order/updateOrderStatus/${orderId}`,
        { newStatus: newStatus, itemId: itemId },
        { withCredentials: true }
      );
      setGroupedOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        );
        return updatedOrders.sort((a, b) => {
          if (a.status === "Completed" || a.status === "Cancelled") {
            return 1;
          }
          if (b.status === "Completed" || b.status === "Cancelled") {
            return -1;
          }
          return 0;
        });
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="p-8 pt-8 min-h-screen"
        style={{
          background: "radial-gradient(circle, #f5f5f5, #e0e0e0, #c7c7c7)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Orders
        </h1>

        <div className="mb-6">
          <div className="flex justify-between">
            <div>
              <label className="mr-2">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="mr-2">Date Range:</label>
              <input
                type="date"
                value={dateFilter.start}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, start: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
              <span className="mx-2">to</span>
              <input
                type="date"
                value={dateFilter.end}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, end: e.target.value })
                }
                className="border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="mr-2">Price Range:</label>
              <input
                type="number"
                value={priceFilter.min}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, min: e.target.value })
                }
                placeholder="Min"
                className="border px-2 py-1 rounded"
              />
              <span className="mx-2">to</span>
              <input
                type="number"
                value={priceFilter.max}
                onChange={(e) =>
                  setPriceFilter({ ...priceFilter, max: e.target.value })
                }
                placeholder="Max"
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-400 shadow-lg">
              <thead>
                <tr className="bg-blue-200">
                  <th className="border px-4 py-2 text-blue-800">Date</th>
                  <th className="border px-4 py-2 text-blue-800">User ID</th>
                  <th className="border px-4 py-2 text-blue-800">Order ID</th>
                  <th className="border px-4 py-2 text-blue-800">Items</th>
                  <th className="border px-4 py-2 text-blue-800">Total</th>
                  <th className="border px-4 py-2 text-blue-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="hover:bg-blue-50 transition-all even:bg-white odd:bg-gray-100"
                  >
                    <td className="text-center align-top border px-4 py-2 text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center align-top border px-4 py-2 text-gray-700">
                      {order.userId || "N/A"}
                    </td>
                    <td className="text-center align-top border px-4 py-2 text-gray-700">
                      #{order.orderId}
                    </td>
                    <td className="border px-4 py-2 text-gray-700">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.productId?.name || "Product Name"} x{" "}
                          {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="text-center align-top border px-4 py-2 text-gray-700">
                      ₹{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="text-center align-top border px-4 py-2">
                      <select
                        className={`border px-2 py-1 rounded text-white cursor-pointer ${
                          order.status === "Pending"
                            ? "bg-yellow-600"
                            : order.status === "Completed"
                            ? "bg-green-800"
                            : "bg-red-600"
                        }`}
                        value={order.status}
                        onChange={(e) => {
                          handleStatusChange(
                            order.sendId,
                            order.orderId,
                            e.target.value
                          );
                        }}
                      >
                        <option
                          value="Pending"
                          className="bg-yellow-400 cursor-pointer text-black"
                        >
                          Pending
                        </option>
                        <option
                          value="Completed"
                          className="bg-green-400 cursor-pointer text-black"
                        >
                          Completed
                        </option>
                        <option
                          value="Cancelled"
                          className="bg-red-400 cursor-pointer text-black"
                        >
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
