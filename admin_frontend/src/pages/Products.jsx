import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { deleteProduct } from "../redux/order-slice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Products = () => {
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
  //   return <Loading></Loading>;
  // }

  const productList = useSelector((state) => state.adminOrder.productList);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleProducts, setVisibleProducts] = useState({
    topPicks: 4,
    vegetarian: 4,
    nonVegetarian: 4,
  });

  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topPicks = filteredProducts.filter(
    (product) => product.category === "Top Picks"
  );
  const vegetarian = filteredProducts.filter(
    (product) => product.category === "Vegetarian"
  );
  const nonVegetarian = filteredProducts.filter(
    (product) => product.category === "Non-Vegetarian"
  );

  const handleShowToggle = (category) => {
    setVisibleProducts((prev) => {
      const currentCount = prev[category];
      const totalCount =
        category === "topPicks"
          ? topPicks.length
          : category === "vegetarian"
          ? vegetarian.length
          : nonVegetarian.length;

      // Toggle the visible product count
      return {
        ...prev,
        [category]:
          currentCount === totalCount
            ? totalCount > 4
              ? 4
              : currentCount
            : totalCount,
      };
    });
  };

  const handleDelete = (_id) => {
    const res = dispatch(deleteProduct(_id));
  };
  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <div className="p-6 w-full flex flex-col justify-center">
        {/* Search Bar */}
        <div className="mb-6 flex items-center gap-3">
          <span className="bg-green-700 hover:bg-green-600 px-5 py-[0.6rem] pt-3 text-2xl rounded-md text-white cursor-pointer">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-bold mb-4">Products</h2>

        {/* Top Picks */}
        <h3 className="text-xl font-semibold mb-2">Top Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {topPicks.slice(0, visibleProducts.topPicks).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {topPicks.length > 4 && (
          <button
            onClick={() => handleShowToggle("topPicks")}
            className="mt-4 text-blue-500 hover:underline"
          >
            {visibleProducts.topPicks === topPicks.length
              ? "Show Less"
              : "Show More"}
          </button>
        )}

        {/* Vegetarian */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Vegetarian</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {vegetarian.slice(0, visibleProducts.vegetarian).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {vegetarian.length > 4 && (
          <button
            onClick={() => handleShowToggle("vegetarian")}
            className="mt-4 text-blue-500 hover:underline"
          >
            {visibleProducts.vegetarian === vegetarian.length
              ? "Show Less"
              : "Show More"}
          </button>
        )}

        {/* Non-Vegetarian */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Non-Vegetarian</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {nonVegetarian
            .slice(0, visibleProducts.nonVegetarian)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
        </div>
        {nonVegetarian.length > 4 && (
          <button
            onClick={() => handleShowToggle("nonVegetarian")}
            className="mt-4 text-blue-500 hover:underline"
          >
            {visibleProducts.nonVegetarian === nonVegetarian.length
              ? "Show Less"
              : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Products;
