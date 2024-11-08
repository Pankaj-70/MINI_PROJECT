import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice.js";
// axios.defaults.withCredentials = true;
const Login = () => {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [buttonText, SetButtonText] = useState("Login");
  const [isProcessing, SetIsProcessing] = useState(false);
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetButtonText("");
    SetIsProcessing(true);
    try {
      const response = await axios.post(
        "/api/v1/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // This is the key to allow cookies to be included
        }
      );
      dispatch(login());
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log("Error in fetching data");
      if (error.response) {
        console.log("Error Response:", error.response.data);
      } else {
        console.log("Error:", error.message);
      }
    } finally {
      SetButtonText("Login");
      SetIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200 text-black"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200 text-gray-900"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-orange-600 focus:ring-orange-400 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">
                Remember Me
              </label>
            </div>
            <Link
              to="/forgot_password"
              className="text-orange-500 hover:text-orange-600 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-200 ${
              isProcessing ? "animate-pulse" : "transform scale-100"
            }`}
          >
            {isProcessing ? (
              <span className="animate-spin inline-block h-6 w-6 border-4 border-t-transparent border-white rounded-full mr-2"></span>
            ) : null}
            {buttonText}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
