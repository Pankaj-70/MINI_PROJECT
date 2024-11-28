import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaList,
  FaPlus,
  FaHome,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { toggleAuth } from "../redux/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(toggleAuth(false));
    navigate("/");
  };
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow-md">
      {/* Left side: Admin Panel logo */}
      <div className="flex items-center gap-3 w-1/3">
        <FaUserShield className="text-2xl" />
        <span className="font-bold text-lg">Admin Panel</span>
      </div>

      {/* Center: Navbar Links */}
      <div className="flex items-center justify-between w-1/3">
        <Link
          to="/home"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <FaList />
          <span>Product List</span>
        </Link>
        <Link
          to="/add-product"
          className="flex items-center gap-2 p-2 rounded hover:bg-gray-700"
        >
          <FaPlus />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Right side: Logout button */}
      <div className="flex items-center justify-end w-1/3">
        <button
          className="flex items-center gap-2 p-2 bg-red-600 hover:bg-red-700 rounded"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
