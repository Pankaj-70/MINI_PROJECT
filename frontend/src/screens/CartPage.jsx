import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import CheckoutForm from "./CheckoutForm";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Increment quantity
  const incrementQuantity = (item) => {
    dispatch(addToCart({ item, quantity: 1 }));
  };

  // Decrement quantity
  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(addToCart({ item, quantity: -1 }));
    }
  };

  // Handle delete
  const handleDeleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-2xl">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row p-6 pt-24 text-gray-800 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen gap-6">
      {/* Cart Items Section */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 text-center">
          Shopping Cart
        </h2>
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-transform duration-300"
            >
              <img
                src={item.img}
                alt={item.content}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.content}
                </h3>
                <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
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
                  ₹{item.price * item.quantity}
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
      </div>

      {/* Checkout Form Section */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-lg sticky top-20 h-fit">
        <CheckoutForm
          totalAmount={calculateTotal()}
          onSubmit={() => alert("Order placed successfully!")}
        />
      </div>
    </div>
  );
};

export default CartPage;
