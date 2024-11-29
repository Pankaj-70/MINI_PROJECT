import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../redux/slices/cartSlice"; // Import actions
import { useNavigate } from "react-router-dom";

const PopUp = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId); // Assuming userId is stored in Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cart = useSelector((state) => state.cart.cartItems);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  console.log(item);
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(addToCart(item, quantity, userId)); // Add item to cart
      onClose();
    }
  };

  const handleBuyNow = () => {
    dispatch(addToCart(item, quantity, userId)); // Add item to cart
    navigate("/cart");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 text-gray-900 flex justify-center items-center min-h-screen z-50">
      <div
        className="absolute inset-0 bg-black opacity-60 z-10"
        onClick={onClose}
      ></div>

      <div className="bg-white z-20 p-6 rounded-lg w-96">
        <div className="relative">
          <IoClose
            className="absolute top-4 right-4 text-gray-600 text-2xl cursor-pointer"
            onClick={onClose}
          />
          <img
            className="w-full h-60 object-cover rounded-lg"
            src={item.img}
            alt={item.name}
          />
          <h2 className="text-xl mt-4 font-semibold">{item.name}</h2>
          <p className="text-lg text-gray-500 mt-2">{item.description}</p>
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <button
                className="text-xl text-gray-600"
                onClick={decrementQuantity}
              >
                <FaMinus />
              </button>
              <span className="text-lg">{quantity}</span>
              <button
                className="text-xl text-gray-600"
                onClick={incrementQuantity}
              >
                <FaPlus />
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xl font-semibold">${item.price}</span>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            <button
              className="bg-green-500 text-white w-full mt-4 py-2 rounded-md"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
