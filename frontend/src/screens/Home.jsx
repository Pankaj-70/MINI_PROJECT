import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "../redux/slices/userSlice";
import { getCart, setCartItems } from "../redux/slices/cartSlice";
import { fetchAllProducts } from "../redux/slices/productSlice";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(setCartItems(topPicks));
    dispatch(setCartItems(vegetarian));
    dispatch(setCartItems(nonVegetarian));
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/user/getuser");

        if (response.data.success) {
          const userId = response.data.data._id;
          dispatch(login({ userId }));
          if (userId) {
            dispatch(getCart(userId));
          }
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  const productList = useSelector((state) => state.product.productList);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredTopPicks = [
    ...topPicks.filter((item) => item.name.toLowerCase().includes(searchQuery)),
    ...vegetarian.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    ),
    ...nonVegetarian.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    ),
  ];

  if (loading) {
    return <div>Page Loading...</div>;
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <motion.div
        className="relative w-full h-[70vh] overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-outline-black font-bold font-playwrite tracking-tight leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to your
            <span className="block mt-6">Go-Food Destination</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-md sm:text-xl md:text-xl lg:text-xl text-gray-300 font-roboto"
            variants={fadeIn}
          >
            ~Where Every Bite Tells a Story
          </motion.p>
          <motion.div
            className="relative mt-4 flex flex-col sm:flex-row w-96"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="What’s your pick..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-2 hover:border-orange-500 w-full text-center lg:text-left"
            />
            <button className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-lg sm:text-xl rounded-lg flex items-center justify-center">
              <FaSearch className="text-2xl" />
            </button>
          </motion.div>
        </div>
      </motion.div>
      {searchQuery !== "" ? (
        filteredTopPicks.length === 0 ? (
          <div>No items match</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {filteredTopPicks.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center bg-slate-200 py-3 px-1 rounded-lg shadow-lg transition-transform hover:shadow-1xl"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-contain rounded-md"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.name}
                </h2>
                <p className="text-lg font-bold text-gray-700">
                  Rs {item.price}
                </p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="bg-gradient-to-r from-blue-400 to-purple-400">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* <ImageSlider
              title="Top Picks"
              name={topPicks}
              description="Discover our top culinary selections that you won't want to miss!"
            /> */}
            {/* <ImageSlider
              title="Vegetarian Delights"
              name={vegetarian}
              description="Explore a variety of delicious vegetarian options crafted with the freshest ingredients!"
            /> */}
            {/* <ImageSlider
              title="Non-Vegetarian Delicacies"
              name={nonVegetarian}
              description="Indulge in our mouthwatering non-vegetarian dishes, perfect for meat lovers!"
            /> */}
          </motion.div>
        </div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Testimonials />
      </motion.div>
      <motion.section
        className="py-10 bg-orange-500 text-white text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Craving Something Delicious?
        </h2>
        <p className="mb-4">
          Join us today and explore an incredible range of dishes!
        </p>
        <button
          className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg hover:bg-orange-400 hover:text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Order Now
        </button>
      </motion.section>
    </div>
  );
};

export default Home;
