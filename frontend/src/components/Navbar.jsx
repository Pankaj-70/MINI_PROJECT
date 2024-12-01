import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa"; // Import Cart Icon
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice.js";
import { MdLogout } from "react-icons/md";
import axios from "axios";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems); // Select cart items from Redux store
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get total number of items in the cart
  const totalCartItems = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="p-4 bg-gray-800 flex items-center justify-between fixed w-full z-50">
      <h1
        className="shadow-white text-4xl font-bold font-playwrite cursor-pointer transition-transform duration-100 transform hover:scale-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-orange-200 to-red-400"
        onClick={() => navigate("/")}
      >
        Gastron
      </h1>

      {/* Main Menu Links (Visible on Larger Screens) */}
      <nav className="hidden md:flex space-x-4">
        <Link
          to="/"
          className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
        >
          About
        </Link>
        <Link
          to="/special"
          className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
        >
          Specials
        </Link>
        <Link
          to="/contact"
          className="text-white hover:text-black hover:bg-white px-2 py-1 rounded-md"
        >
          Contact Us
        </Link>
      </nav>

      {/* FaUser Icon, Cart Icon, and Login Button (Larger Screens) */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        {isLoggedIn && (
          <Link to="/cart" className="relative cursor-pointer">
            <FaShoppingCart className="text-white text-2xl" />
            {totalCartItems > 0 && (
              <span className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
        )}

        {isLoggedIn ? (
          <div className="flex flex-col items-center">
            <button
              className="hidden md:block text-gray-800 bg-white text-[18px] cursor-pointer hover:bg-gray-500 hover:text-white p-2 rounded-full"
              onClick={toggleSidebar}
            >
              <FaUser className="text-2xl" />
            </button>
          </div>
        ) : (
          <button
            className="hidden md:block text-white bg-orange-700 px-4 py-1 text-[17px] rounded-md hover:bg-orange-500 font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      {/* Sidebar Toggle Button for Small Screens */}
      <div className="md:hidden">
        <button
          className="text-[27px] cursor-pointer hover:bg-gray-700 p-2 rounded-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <IoClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar for Small Screens with Menu and Profile Options */}
      {isSidebarOpen && (
        <div className="absolute right-0 top-[75px] bg-gray-700 text-white w-[300px] h-screen z-50">
          {/* Menu Links */}
          <Link
            to="/"
            className="lg:hidden block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="lg:hidden block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
            onClick={toggleSidebar}
          >
            About
          </Link>
          <Link
            to="/special"
            className="lg:hidden block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
            onClick={toggleSidebar}
          >
            Specials
          </Link>
          <Link
            to="/contact"
            className="lg:hidden block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
            onClick={toggleSidebar}
          >
            Contact Us
          </Link>

          {/* Profile Options (Visible when Logged In) */}
          {isLoggedIn && (
            <>
              <Link
                to="/profile"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                Wishlist
              </Link>
              <Link
                to="/settings"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                Settings
              </Link>
              <Link
                to="/payment-methods"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                Payment Methods
              </Link>
              <Link
                to="/notifications"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                Notifications
              </Link>
              <Link
                to="/support"
                className="block py-2 hover:bg-gray-400 w-full hover:text-black px-4 pt-3 rounded-md"
                onClick={toggleSidebar}
              >
                Help & Support
              </Link>

              <button
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      "/api/v1/user/logout",
                      {},
                      { withCredentials: true }
                    );
                    console.log("User logged out successfully");
                    dispatch(logout());
                    toggleSidebar(); // Close the sidebar
                    navigate("/"); // Redirect to homepage
                  } catch (error) {
                    console.error("Logout failed:", error);
                    alert("Logout failed, please try again.");
                  }
                }}
                className="w-full text-left py-2 px-4 pt-3 rounded-md mt-4 hover:bg-gray-400 hover:text-black flex items-center space-x-2"
              >
                <MdLogout className="text-[21px] font-extrabold" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
