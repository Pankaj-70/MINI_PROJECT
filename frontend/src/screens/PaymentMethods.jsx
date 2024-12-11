import React from "react";
import {
  FaShoppingCart,
  FaPaypal,
  FaUserLock,
  FaCheckCircle,
} from "react-icons/fa";

const PaymentMethods = () => {
  return (
    <div className="text-center p-8 pt-24 space-y-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-black font-playwrite underline underline-offset-4">
        Payment Methods
      </h1>
      <p className="text-lg text-gray-700">
        Payments are only possible through PayPal. Follow the steps below to
        complete your payment securely.
      </p>
      <div className="text-left space-y-4">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <FaShoppingCart className="text-orange-600 w-6 h-6 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Step 1: Choose Items
            </h2>
            <p className="text-gray-600">
              Browse through our catalog, add items to your cart, and proceed to
              checkout.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <FaPaypal className="text-blue-600 w-6 h-6 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Step 2: Select PayPal
            </h2>
            <p className="text-gray-600">
              At the payment page, choose PayPal as your preferred payment
              method.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <FaUserLock className="text-gray-800 w-6 h-6 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Step 3: Log In to PayPal
            </h2>
            <p className="text-gray-600">
              You will be redirected to the PayPal login page. Enter your
              credentials and log in to your account.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-start">
          <FaCheckCircle className="text-green-600 w-6 h-6 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Step 4: Confirm Payment
            </h2>
            <p className="text-gray-600">
              Review the details, confirm the payment, and get redirected to our
              website for your order reviewing.
            </p>
          </div>
        </div>
      </div>
      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition">
        <a
          href="https://www.paypal.com/us/digital-wallet/how-paypal-works"
          target="_blank"
          rel="noopener noreferrer"
        >
          Proceed to PayPal
        </a>
      </button>
    </div>
  );
};

export default PaymentMethods;
