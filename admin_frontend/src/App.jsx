import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "./redux/order-slice";
import Products from "./pages/Products";
import Login from "./pages/Login";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
