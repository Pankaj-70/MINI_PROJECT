import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // You can add more complex functionality here, such as order submission logic
    alert("Order placed successfully!");
    navigate("/"); // Redirect back to the homepage after checkout
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 pt-24">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>

      <div className="flex flex-col gap-4 mb-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <img
              src={item.img}
              alt={item.content}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold">{item.content}</h3>
              <p className="text-gray-600">Price: Rs {item.price} /-</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="text-xl font-semibold">
              Rs {item.price * item.quantity} /-
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold">Total: Rs {totalAmount} /-</h3>
      </div>

      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
