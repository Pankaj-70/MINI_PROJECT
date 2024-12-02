import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const PopUp = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(addToCart(item, quantity, userId));
      onClose();
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(addToCart(item, quantity, userId));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded-lg w-[28rem] shadow-2xl z-10">
        <IoClose
          className="absolute top-4 right-4 text-gray-600 text-2xl cursor-pointer"
          onClick={onClose}
        />
        <img
          className="w-full h-60 object-cover rounded-lg mb-4"
          src={item.img}
          alt={item.name}
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {item.name}
          {"     "}
          <span className="text-blue-800 text-[1.3rem]">
            ({item.calorie} kCal)
          </span>
        </h2>
        <p className="text-gray-600 text-sm mt-2">{item.description}</p>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={decrementQuantity}
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold text-black">{quantity}</span>
            <button
              className="text-gray-600 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              onClick={incrementQuantity}
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-xl font-semibold text-green-600">
            $ {item.price * quantity}
          </span>
        </div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white mt-6 py-2 rounded-lg font-medium"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="w-full bg-green-600 hover:bg-green-500 text-white mt-4 py-2 rounded-lg font-medium"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PopUp;
