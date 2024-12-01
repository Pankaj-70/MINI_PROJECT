import React, { useState } from "react";

const CheckoutForm = ({ totalAmount, onSubmit }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  // Define additional charges
  const taxRate = 0.18; // 18% tax
  const shippingFee = 50; // Shipping fee in INR
  const handlingFee = 20; // Handling fee in INR

  // Calculate additional charges and grand total
  const taxAmount = totalAmount * taxRate;
  const grandTotal = totalAmount + taxAmount + shippingFee + handlingFee;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userDetails); // Pass userDetails to parent component
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Checkout
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your shipping address"
            value={userDetails.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Payment Method
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userDetails.paymentMethod}
            onChange={(e) =>
              setUserDetails({ ...userDetails, paymentMethod: e.target.value })
            }
            required
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Order Summary Breakdown */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-200 space-y-2">
          <h4 className="text-xl font-semibold text-gray-800 text-center">
            Order Summary
          </h4>
          <div className="text-gray-700 space-y-1">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax (18%):</p>
              <p>₹{taxAmount}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping Fee:</p>
              <p>₹{shippingFee}</p>
            </div>
            <div className="flex justify-between">
              <p>Handling Fee:</p>
              <p>₹{handlingFee}</p>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <p>Grand Total:</p>
              <p>₹{grandTotal}</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
