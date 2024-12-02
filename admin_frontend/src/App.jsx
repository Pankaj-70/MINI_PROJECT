import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllProducts,
  setTotalOrders,
  setTotalUsers,
} from "./redux/order-slice";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { toggleAuth } from "./redux/auth-slice";
import axios from "axios";
import Orders from "./pages/Orders";

const App = () => {
  const dispatch = useDispatch();
  let totalUsers = 0;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "api/v1/admin/getuser",
          {},
          {
            withCredentials: true,
          }
        );

        dispatch(toggleAuth(true));
        dispatch(setTotalUsers(response.data.totalUsers));
        const res = await axios.get(
          "/api/v1/order/getAllOrders",
          {},
          { withCredentials: true }
        );
        const allOrders = res.data.data.flatMap((orderData) =>
          orderData.orders.map((order) => ({
            createdAt: order.createdAt,
            userId: orderData.userId,
            orderId: order._id,
            sendId: orderData._id,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
          }))
        );
        const uniquePendingOrders = [
          ...new Set(
            allOrders
              .filter((order) => order.status === "Pending")
              .map((order) => order.orderId)
          ),
        ].length;
        dispatch(setTotalOrders(uniquePendingOrders));
      } catch (error) {
        console.log(error);
      }

      dispatch(fetchAllProducts());
    };
    dispatch(toggleAuth(true));
    fetchUser();
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
