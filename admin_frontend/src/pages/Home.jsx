import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.adminOrder.productList.length);
  const isAuthenticated = useSelector(
    (state) => state.authenticate.isAuthenticated
  );
  const totalOrders = useSelector((state) => state.adminOrder.totalOrders);
  const totalUsers = useSelector((state) => state.adminOrder.totalUsers);
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      window.location.reload();
    }
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
            scheduleDate: order.scheduleDate,
            scheduleTime: order.scheduleTime,
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
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-6 py-4">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage all aspects of your food delivery website from this panel.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Total Products</h2>
            <p className="text-4xl font-bold mt-2">{items}</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Orders Pending</h2>
            <p className="text-4xl font-bold mt-2">{totalOrders}</p>
          </div>
          <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Active Users</h2>
            <p className="text-4xl font-bold mt-2">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Latest Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">User ID</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Total Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      No orders available
                    </td>
                  </tr>
                )}
                {filteredOrders.slice(0, 3).map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">#{order.orderId}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span>{order.userId}</span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-lg${
                          order.status === "Completed"
                            ? " text-green-600"
                            : order.status === "Cancelled"
                            ? " text-red-600"
                            : " text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className="font-medium">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 text-center">
            <h3 className="text-lg font-semibold mb-2">Manage Products</h3>
            <p className="mb-4">
              Add, update, or remove products in the system.
            </p>
            <Link
              to="/products"
              className="bg-purple-800 hover:bg-purple-900 px-4 py-2 rounded text-white"
            >
              Go to Product List
            </Link>
          </div>
          <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg hover:bg-teal-700 transition duration-300 text-center">
            <h3 className="text-lg font-semibold mb-2">Orders Overview</h3>
            <p className="mb-4">View and manage orders placed by customers.</p>
            <Link
              to="/orders"
              className="bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded text-white"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
