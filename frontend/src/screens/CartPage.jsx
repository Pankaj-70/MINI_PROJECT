import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import CheckoutForm from "./CheckOutForm";
import { toast } from "react-toastify";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaCheck,
  FaShoppingCart,
} from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
  setError,
  updateItemQuantity,
} from "../redux/slices/cartSlice";

const selectCartItems = createSelector(
  (state) => state.cart.cartItems,
  (cartItems) => cartItems || []
);

const CartPage = () => {
  const err = useSelector((state) => state.cart.error);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const handleOrderButton = () => {
    cartItems.forEach((item) => {
      dispatch(removeFromCart(item));
    });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const incrementQuantity = (item) => {
    const productId = item.productId._id;
    dispatch(updateItemQuantity(productId, 1, userId));
    if (err != "") {
      toast.error(err, {
        autoClose: 500,
        position: "top-center",
      });
      dispatch(setError(""));
    }
  };
  const decrementQuantity = (item) => {
    const productId = item.productId._id;
    if (item.quantity > 1) {
      dispatch(updateItemQuantity(productId, -1, userId));
    }
  };
  const handleDeleteItem = (item) => {
    const itemId = item.productId._id;
    dispatch(removeFromCart(itemId, userId));
  };
  const calculateTotal = () => {};

  return (
    <div className="relative flex flex-col md:flex-row p-6 pt-24 text-gray-800 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen gap-6">
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 text-xl font-semibold px-28 py-44 rounded-lg shadow-lg animate-fadeIn">
            <div className="flex flex-col items-center">
              <FaCheck className="text-green-500 text-6xl mb-4 animate-bounceIn" />
              <p>Order Placed Successfully!</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 border-2 border-black rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl bg-orange-200 py-8 font-playwrite border-b-2 border-black font-semibold text-gray-900 text-center">
          <div className="flex gap-5 justify-center items-center">
            <FaShoppingCart />
            Shopping Cart
            <FaShoppingCart />
          </div>
        </h2>
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-[length:5px_100%] bg-[repeat-x] h-[40rem]">
            <div className="text-2xl font-serif text-gray-500 font-semibold">
              Your Cart Is Empty
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-transform duration-300"
              >
                <img
                  src={item.productId.img}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Price: ₹{item.productId.price}
                  </p>
                  <div className="flex items-center mt-2 space-x-3">
                    <button
                      onClick={() => decrementQuantity(item)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      <FaMinus className="text-gray-700" />
                    </button>
                    <span className="text-md font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                    >
                      <FaPlus className="text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold text-gray-800">
                    ₹{item.productId.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-lg sticky top-20 h-fit">
        <CheckoutForm
          totalAmount={calculateTotal()}
          onSubmit={handleOrderButton}
        />
      </div>
    </div>
  );
};

export default CartPage;
