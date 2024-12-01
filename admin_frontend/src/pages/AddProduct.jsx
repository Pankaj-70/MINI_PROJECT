import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { addNewProduct } from "../redux/order-slice";
import { toast } from "react-toastify";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authenticate.isAuthenticated
  );

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, navigate]);

  // if (!isAuthenticated) {
  //   return <Loading />;
  // }

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCalories, setProductCalories] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProductImage(file);
      setError("");
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productImage ||
      !productCategory ||
      !productCalories
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    if (productStock < 1) {
      setError("Stock should be at least 1.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("img", productImage);
    formData.append("stock", productStock);
    formData.append("category", productCategory);
    formData.append("calories", productCalories);

    dispatch(addNewProduct(formData));
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductImage(null);
    setProductStock("");
    setProductCategory("");
    setProductCalories("");
    toast.success("Product added successfully!", {
      autoClose: 600,
      position: "bottom-right",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700">
      <Navbar />
      <div className="w-full pt-6 flex justify-center">
        <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-xl text-black">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Add New Product
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="productName"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="productPrice"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Price ($)
                </label>
                <input
                  type="number"
                  id="productPrice"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product price"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="productCalories"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Calories (kcal)
                </label>
                <input
                  type="number"
                  id="productCalories"
                  value={productCalories}
                  onChange={(e) => setProductCalories(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter calories"
                  required
                  min="1"
                />
              </div>

              <div>
                <label
                  htmlFor="productStock"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Stock
                </label>
                <input
                  type="number"
                  id="productStock"
                  value={productStock}
                  onChange={(e) => setProductStock(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product stock"
                  min="1"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="productDescription"
                className="text-lg font-medium mb-2 text-gray-800"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"
                rows="3"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="productCategory"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Category
                </label>
                <select
                  id="productCategory"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Top Picks">Top Picks</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="productImage"
                  className="text-lg font-medium mb-2 text-gray-800"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="productImage"
                  onChange={handleImageChange}
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white text-[1.1rem] py-3 px-6 rounded-lg w-full"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
