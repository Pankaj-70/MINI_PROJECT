import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
const Home = () => {
  const items = useSelector((state) => state.adminOrder.productList.length);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-6 py-4">
        {/* Welcome Section */}
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Manage all aspects of your food delivery website from this panel.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Total Products</h2>
            <p className="text-4xl font-bold mt-2">{items}</p>
          </div>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Orders Today</h2>
            <p className="text-4xl font-bold mt-2">43</p>
          </div>
          <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
            <h2 className="text-2xl font-semibold">Active Users</h2>
            <p className="text-4xl font-bold mt-2">120</p>
          </div>
        </div>

        {/* Latest Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Latest Orders
          </h2>
          <table className="w-full table-auto text-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-300">
                <td className="p-2">#12345</td>
                <td className="p-2">John Doe</td>
                <td className="p-2 text-green-600">Delivered</td>
                <td className="p-2">$45.99</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">#12346</td>
                <td className="p-2">Jane Smith</td>
                <td className="p-2 text-yellow-600">Processing</td>
                <td className="p-2">$30.00</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="p-2">#12347</td>
                <td className="p-2">Robert Brown</td>
                <td className="p-2 text-blue-600">Shipped</td>
                <td className="p-2">$60.50</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
          <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 text-center">
            <h3 className="text-lg font-semibold mb-2">
              Restaurant Management
            </h3>
            <p className="mb-4">
              Manage restaurant profiles and their requests.
            </p>
            <Link
              to="/customers"
              className="bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded text-white"
            >
              Manage Restaurants
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
