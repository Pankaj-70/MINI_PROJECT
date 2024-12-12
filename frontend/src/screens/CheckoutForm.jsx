import React, { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import {
  FaMapMarkedAlt,
  FaMapMarker,
  FaMapMarkerAlt,
  FaMapPin,
} from "react-icons/fa";

const CheckoutForm = ({ totalAmount, onSubmit }) => {
  const [userDetails, setUserDetails] = useState({
    address: "",
    scheduleDate: "",
    scheduleTime: "",
  });

  const taxRate = totalAmount > 0 ? 0.18 : 0;
  const shippingFee = totalAmount > 0 ? 50 : 0;
  const handlingFee = totalAmount > 0 ? 20 : 0;
  const taxAmount = totalAmount * taxRate;
  const grandTotal = totalAmount + taxAmount + shippingFee + handlingFee;
  const [place, setPlace] = useState(false);

  const handleSubmit = async (details) => {
    try {
      const response = await axios.post("/api/paypal/create-payment", {
        amount: grandTotal,
        paymentDetails: details,
        schedule: {
          date: userDetails.scheduleDate,
          time: userDetails.scheduleTime,
        },
      });
      console.log(response.data);
      toast.success("Payment successful!", {
        autoClose: 900,
        position: "top-left",
      });
      setPlace(true);
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Checkout
      </h2>
      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Shipping Address
          </label>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className="text-2xl absolute left-[53px]" />
            <input
              type="text"
              placeholder="Enter your shipping address"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              className="w-full border text-center border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Schedule Date
          </label>
          <input
            type="date"
            value={userDetails.scheduleDate}
            onChange={(e) =>
              setUserDetails({ ...userDetails, scheduleDate: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Schedule Time
          </label>
          <input
            type="time"
            value={userDetails.scheduleTime}
            onChange={(e) =>
              setUserDetails({ ...userDetails, scheduleTime: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Order Summary
          </h3>
          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax (18%):</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping Fee:</span>
            <span>${shippingFee}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Handling Fee:</span>
            <span>${handlingFee}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 mt-3">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
        {grandTotal > 0 ? (
          <>
            <PayPalScriptProvider
              options={{
                clientId:
                  "AengVu6dW4ZWFR9Cnwp0-TtG1ixkBWn8QKC8O0EFiQ3RIm-s6vbqtFzWloiN2VNYAgZe-hviaudmtxYX",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  shape: "rect",
                  label: "pay",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: grandTotal.toFixed(2).toString(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    handleSubmit(details);
                  });
                }}
                onError={(err) => {
                  alert("Payment failed. Please try again.");
                  console.error(err);
                }}
              />
            </PayPalScriptProvider>
            <button
              disabled={!place}
              className={`w-full py-2 text-white rounded-md text-center ${
                place
                  ? "bg-green-800 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => {
                setPlace(false);
                onSubmit(
                  {
                    scheduleDate: userDetails.scheduleDate,
                    scheduleTime: userDetails.scheduleTime,
                  },
                  e
                );
              }}
            >
              Place Order
            </button>
          </>
        ) : (
          <div className="text-red-500 text-center mt-4">
            Total amount must be greater than zero to proceed with payment.
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
