import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";

const PopUp = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  useEffect(() => {
    const randomRating = Math.floor(Math.random() * 5) + 2;
    setRating(randomRating);
  }, []);

  const renderStars = (rating) => {
    let stars = "★".repeat(rating);
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 text-gray-900 flex justify-center items-center min-h-screen z-50">
      <div
        className="absolute inset-0 bg-black opacity-60 z-10"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-lg p-8 w-96 md:w-[500px] lg:w-[600px] shadow-2xl transform scale-95 transition-transform duration-500 ease-in-out z-20 animate-popIn">
        <button onClick={onClose} className="text-black float-right">
          <IoClose className="text-3xl font-extrabold"></IoClose>
        </button>

        <div className="flex items-center mb-3">
          <img
            src={item.img}
            alt={item.content}
            className="w-36 h-32 md:w-48 md:h-44 object-cover bg-white rounded-lg border-2 border-white shadow-md mr-4"
          />
        </div>

        <h3 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          {item.content}
          <span className="text-yellow-500 text-3xl font-extrabold ml-2">
            ({renderStars(rating)})
          </span>
        </h3>

        <p className="text-gray-700 mb-2 text-[0.9rem]">{item.description}</p>

        <div className="mb-4">
          <p className="text-red-600 line-through text-xl">
            Rs{" "}
            {Math.floor(item.price + item.price * (0.1 + 0.1 * quantity)) *
              quantity}
          </p>
          <p className="text-green-600 text-xl font-semibold">
            Rs {item.price * quantity} /-
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              <FaMinus />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              <FaPlus />
            </button>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
