import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Forgot Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 text-sm"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
