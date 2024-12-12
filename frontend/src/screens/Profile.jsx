import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaHeart,
  FaCreditCard,
  FaLifeRing,
  FaEnvelope,
  FaCartArrowDown,
} from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const footerRef = useRef(null);

  const handleScrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col font-serif text-black pt-24 items-center w-full mx-auto p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-indigo-100 border-amber-300 border-y-2 shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-lg">
          <strong>Username:</strong> {user?.name || "Guest"}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user?.email || "Not provided"}
        </p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-3 grid-rows-2 gap-6">
        <Link
          to="/orders"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg hover:bg-green-100 transition duration-200"
        >
          <FaBox className="text-4xl text-blue-500 mb-2" />
          <p className="text-xl font-semibold">Orders</p>
        </Link>
        <Link
          to="/cart"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg hover:bg-green-100 transition duration-200"
        >
          <FaCartArrowDown className="text-4xl text-orange-600 mb-2" />
          <p className="text-xl font-semibold">Cart</p>
        </Link>
        <Link
          to="/payment-methods"
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg hover:bg-green-100 transition duration-200"
        >
          <FaCreditCard className="text-4xl text-green-500 mb-2" />
          <p className="text-xl font-semibold">Payment Methods</p>
        </Link>
        <div
          onClick={handleScrollToFooter}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg hover:bg-green-100 transition duration-200 cursor-pointer w-full"
        >
          <FaEnvelope className="text-4xl text-yellow-500 mb-2" />
          <p className="text-xl font-semibold">Subscription</p>
        </div>
        <Link
          to="/contact"
          className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:bg-purple-200 transition duration-200"
        >
          <FaLifeRing className="text-4xl text-purple-500 mb-2" />
          <p className="text-xl font-semibold">Help & Support</p>
        </Link>
      </div>

      <footer
        ref={footerRef}
        className="w-1 h-1 bg-gray-200 text-white text-center mt-8 rounded-lg"
      >
        <p className="text-sm">© 2024 Gastron. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
