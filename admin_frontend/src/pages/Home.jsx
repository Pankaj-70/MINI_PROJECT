import { Link } from "react-router-dom";
import SidePanel from "../components/SidePanel";
const Home = () => {
	return (
		<div>
			<SidePanel></SidePanel>
			<div className="text-white px-4 my-3">
				<h1 className="text-3xl font-bold mb-4 text-black">
					Welcome to the Admin Dashboard
				</h1>
				<p className="text-lg mb-6 text-black">
					Manage all aspects of your food delivery website from this panel.
				</p>

				{/* Stats Overview */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
						<h2 className="text-xl font-semibold">Total Products</h2>
						<p className="text-3xl mt-2">25</p>
					</div>
					<div className="bg-green-600 p-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
						<h2 className="text-xl font-semibold">Orders Today</h2>
						<p className="text-3xl mt-2">43</p>
					</div>
					<div className="bg-yellow-600 p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300">
						<h2 className="text-xl font-semibold">Active Users</h2>
						<p className="text-3xl mt-2">120</p>
					</div>
				</div>

				{/* Latest Orders */}
				<div className="bg-gray-800 p-6 rounded-lg shadow-lg">
					<h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
					<table className="min-w-full table-auto text-sm">
						<thead>
							<tr>
								<th className="p-2 text-left">Order ID</th>
								<th className="p-2 text-left">Customer</th>
								<th className="p-2 text-left">Status</th>
								<th className="p-2 text-left">Total</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-t border-gray-600">
								<td className="p-2">#12345</td>
								<td className="p-2">John Doe</td>
								<td className="p-2">Delivered</td>
								<td className="p-2">$45.99</td>
							</tr>
							<tr className="border-t border-gray-600">
								<td className="p-2">#12346</td>
								<td className="p-2">Jane Smith</td>
								<td className="p-2">Processing</td>
								<td className="p-2">$30.00</td>
							</tr>
							<tr className="border-t border-gray-600">
								<td className="p-2">#12347</td>
								<td className="p-2">Robert Brown</td>
								<td className="p-2">Shipped</td>
								<td className="p-2">$60.50</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
					<div className="bg-purple-600 p-6 rounded-lg shadow-lg text-center hover:bg-purple-700 transition duration-300">
						<h3 className="text-lg font-semibold mb-2">Manage Products</h3>
						<p className="mb-4">
							Add, update, or remove products in the system.
						</p>
						<Link
							to="/products"
							className="bg-blue-800 hover:bg-blue-900 p-2 rounded text-white"
						>
							Go to Product List
						</Link>
					</div>
					<div className="bg-teal-600 text-black p-6 rounded-lg shadow-lg text-center hover:bg-teal-700 transition duration-300">
						<h3 className="text-lg font-semibold mb-2">Orders Overview</h3>
						<p className="mb-4">View and manage orders placed by customers.</p>
						<Link
							to="/orders"
							className="bg-green-800 hover:bg-green-900 p-2 rounded text-white"
						>
							View Orders
						</Link>
					</div>
					<div className="bg-indigo-600 p-6 rounded-lg shadow-lg text-center hover:bg-indigo-700 transition duration-300">
						<h3 className="text-lg font-semibold mb-2">
							Restaurant Management
						</h3>
						<p className="mb-4">
							Manage restaurant profiles and their requests.
						</p>
						<Link
							to="/customers"
							className="bg-yellow-800 hover:bg-yellow-900 p-2 rounded text-white"
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
