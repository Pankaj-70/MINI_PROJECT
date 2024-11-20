import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";

const SpecialItem = ({ item }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = 1;

  const handleBuyNow = (item) => {
    if (isLoggedIn) {
      dispatch(addToCart({ item, quantity }));
      console.log(item.content);
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col justify-around px-[1rem] w-[80rem] bg-white rounded-lg shadow-lg p-6 hover:scale-[1.02] transform transition duration-300 text-gray-800">
      <img
        src={item.img}
        alt={item.content}
        className="w-full h-36 object-cover rounded-lg mb-4 shadow-md"
      />
      <div className="relative">
        <div className="absolute -top-4 -left-4 bg-yellow-300 text-xs font-bold px-3 py-1 rounded-full shadow-lg text-gray-800">
          {item.price}
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-3 text-indigo-800 hover:text-indigo-600 transition-colors">
        {item.content}
      </h4>
      <p className="text-gray-700 text-sm">{item.description}</p>
      <div className="mt-4 flex gap-1 items-center">
        <button
          className="bg-gradient-to-r from-green-500 to-green-600 text-sm font-semibold py-2 px-4 rounded-full hover:from-green-600 hover:to-green-700 transition-all shadow-md text-black"
          onClick={() => handleBuyNow(item)} // Fixed this line
        >
          Buy Now
        </button>
        <div className="text-lg font-bold text-red-600">
          Save {Math.floor(Math.random() * 60 + 10)}%
        </div>
      </div>
    </div>
  );
};

export default SpecialItem;
