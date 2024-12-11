import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaHeart,
  FaCog,
  FaCreditCard,
  FaBell,
  FaLifeRing,
} from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col text-black pt-24 items-center w-full mx-auto p-8 bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-lg">
          <strong>Username:</strong> {user?.name || "Guest"}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user?.email || "Not provided"}
        </p>
      </div>

      {/* Dashboard Section */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Items */}
        <Link
          to="/orders"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaBox className="text-4xl text-blue-500 mb-2" />
          <p className="text-xl font-semibold">Orders</p>
        </Link>
        <Link
          to="/wishlist"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaHeart className="text-4xl text-red-500 mb-2" />
          <p className="text-xl font-semibold">Wishlist</p>
        </Link>
        <Link
          to="/settings"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaCog className="text-4xl text-gray-500 mb-2" />
          <p className="text-xl font-semibold">Settings</p>
        </Link>
        <Link
          to="/payment-methods"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaCreditCard className="text-4xl text-green-500 mb-2" />
          <p className="text-xl font-semibold">Payment Methods</p>
        </Link>
        <Link
          to="/notifications"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaBell className="text-4xl text-yellow-500 mb-2" />
          <p className="text-xl font-semibold">Notifications</p>
        </Link>
        <Link
          to="/contact"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-100 transition duration-200"
        >
          <FaLifeRing className="text-4xl text-purple-500 mb-2" />
          <p className="text-xl font-semibold">Help & Support</p>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
