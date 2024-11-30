import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "./redux/order-slice";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { toggleAuth } from "./redux/auth-slice";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authenticate.isAuthenticated
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "api/v1/admin/getLoginUser",
          {},
          {
            withCredentials: true,
          }
        );
        dispatch(toggleAuth(true));
        console.log(response);
      } catch (error) {}

      dispatch(fetchAllProducts());
    };
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
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
