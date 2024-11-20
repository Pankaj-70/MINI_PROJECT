import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import Pizza from "../assets/HomeImages/pizza.png";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "../redux/slices/userSlice";
import { getCart, setCartItems } from "../redux/slices/cartSlice";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

const Home = () => {
  const topPicks = [
    {
      id: null,
      img: Pizza,
      name: "Pizza",
      price: 299,
      description:
        "A classic Italian delight with a crispy crust, rich tomato sauce, and a blend of melted cheese. Topped with fresh ingredients and baked to perfection, this pizza offers an irresistible taste experience.",
    },
    {
      id: null,
      img: "https://t3.ftcdn.net/jpg/05/38/20/62/240_F_538206263_J6N0PMo7117V6hXKRaWm70kebNuHsSnn.jpg",
      name: "Burgers",
      price: 199,
      description:
        "Juicy, perfectly grilled patties stacked with fresh lettuce, tomatoes, and cheese in a soft bun. Every bite is a burst of flavor, making it a satisfying meal on the go or a classic comfort food.",
    },
    {
      id: null,
      img: "https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc=",
      name: "South Indian",
      price: 249,
      description:
        "A delightful assortment of South Indian dishes like dosa, idli, and sambhar. These items are known for their savory flavors, made with authentic spices and served with flavorful chutneys.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-psd/glasses-cola-drink-isolated-transparent-background_436336-1353.jpg?w=740",
      name: "Drinks",
      price: 99,
      description:
        "A refreshing selection of chilled beverages, perfect to cool down or complement your meal. Choose from a variety of soft drinks, juices, and smoothies made to quench your thirst.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-photo/pasta-with-tomato-sauce-glass-plate_917710-591.jpg?w=740",
      name: "Italian",
      price: 549,
      description:
        "Indulge in classic Italian flavors with pasta, sauces, and herbs that offer an authentic taste of Italy. A perfect choice for pasta lovers, crafted with fresh ingredients for a satisfying meal.",
    },
    {
      id: null,
      img: "https://img.freepik.com/free-psd/bowl-biryani-with-chicken-pieces-transparent-background_84443-1317.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Biryani",
      price: 299,
      description:
        "Aromatic rice cooked with rich spices, tender pieces of chicken, and garnished with caramelized onions. Each spoonful is packed with flavor, making it a perfect dish for any occasion.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      name: "Sushi",
      price: 749,
      description:
        "Delicate rolls of seasoned rice and fresh fish, skillfully wrapped in seaweed. Enjoy a variety of flavors from sweet to savory, offering a true taste of Japanese culinary excellence.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-photo/top-view-black-bean-noodles-with-sesame-seeds_1153807-7749.jpg?w=740",
      name: "Noodles",
      price: 249,
      description:
        "Classic noodles tossed with fresh vegetables and a savory sauce. Perfectly seasoned and garnished with sesame seeds, creating a comforting and satisfying Asian-inspired dish.",
    },
    {
      id: null,
      img: "https://img.freepik.com/free-photo/vegetables-salad-table_23-2148515515.jpg?t=st=1730289854~exp=1730293454~hmac=df8f8aba2dbba4e764e1df18caba083e774ff42d4d04fcdc4d597aaf1b079f42&w=740",
      name: "Salads",
      price: 149,
      description:
        "Fresh, crisp vegetables tossed in a light dressing, providing a healthy and refreshing meal option. Choose from a variety of salads, each rich in nutrients and bursting with natural flavors.",
    },
    {
      id: null,
      img: "https://img.freepik.com/free-photo/delicious-cupcake-with-berries-figs_23-2150798168.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Desserts",
      price: 179,
      description:
        "A selection of sweet treats to end your meal on a high note. From creamy cakes to fruity desserts, each option is crafted to indulge your sweet tooth and provide a satisfying experience.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-photo/delicious-ice-cream-with-topping_216014-10580.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Ice Cream",
      price: 99,
      description:
        "Cool and creamy ice cream in a variety of flavors, perfect for any season. Enjoy a refreshing scoop or two of this delightful treat that offers pure sweetness in every bite.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-photo/proper-nutrition-smoothie-freshes-splash-blended-fruit-smoothies-ecological-food-healthy-lifestyle_1029622-116624.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Smoothies",
      price: 129,
      description:
        "Delicious, nutrient-packed smoothies made from fresh fruits and vegetables. These blends are a great way to energize and refresh yourself throughout the day.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-psd/cup-coffee-croissants-isolated-transparent-background_617816-15226.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Breakfast",
      price: 159,
      description:
        "Start your day with a delicious breakfast that includes coffee and freshly baked croissants. Ideal for a quick yet satisfying meal to fuel your morning.",
    },
    {
      id: null,
      img: "https://img.freepik.com/premium-photo/bowl-soup-with-white-bowl-with-red-pepper-side_1023064-74203.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
      name: "Soup",
      price: 99,
      description:
        "Warm and comforting, our soups are made with fresh ingredients and seasoned to perfection. Choose from a range of flavors for a cozy meal option.",
    },
  ];

  const vegetarian = [
    {
      id: null,
      img: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Salad",
      price: 149,
      description:
        "A fresh, crisp mix of seasonal greens and colorful vegetables, all tossed together with a light, zesty dressing. This healthy option is perfect for anyone seeking a light and nutritious meal. It’s a great choice to refresh your palate and add some freshness to your day.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Indian",
      price: 299,
      description:
        "Indulge in the rich, bold flavors of Indian vegetarian cuisine. From spiced curries to creamy paneer, this collection offers an authentic taste of India. Each dish is carefully prepared with traditional spices and fresh ingredients, ensuring every bite is full of flavor.",
    },
    {
      id: null,
      img: "https://www.foodiesfeed.com/wp-content/uploads/2016/04/toasted-sandwich-with-pickles.jpg",
      name: "Sandwich",
      price: 129,
      description:
        "Freshly toasted sandwiches filled with a variety of delicious vegetarian ingredients like cheese, veggies, and spreads. Perfect for a quick, yet satisfying meal, this sandwich brings comfort with every bite. It’s a delicious option for both breakfast or lunch.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Farmhouse Pizza",
      price: 299,
      description:
        "A crispy and cheesy vegetarian pizza topped with fresh vegetables and herbs. This pizza offers a great mix of flavors with every slice, from the richness of cheese to the freshness of the toppings. A must-try for pizza lovers looking for a vegetarian twist.",
    },
    {
      id: null,
      img: "https://media.istockphoto.com/id/1158440121/cs/fotografie/zarda-rice-nebo-meethe-chawal.jpg?s=612x612&w=0&k=20&c=xxNOr8NxpV3yM1bLzEowlTu-F_2-a7ZgXb4AyZRof9I=",
      name: "Pulao",
      price: 229,
      description:
        "This fragrant vegetarian biryani is made with aromatic rice, mixed vegetables, and a perfect blend of spices. It’s a satisfying and flavorful dish that brings out the best of Indian vegetarian cuisine. Ideal for anyone looking for a hearty meal with bold flavors.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/9027521/pexels-photo-9027521.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Samosa",
      price: 99,
      description:
        "Crispy and golden on the outside, with a spiced potato and vegetable filling inside. These savory samosas are perfect as a snack or appetizer. Their delicious crunch and flavorful filling make them a popular choice among vegetarian food lovers.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Butter Paneer",
      price: 249,
      description:
        "Rich, creamy, and full of flavor, this butter paneer is a favorite in Indian vegetarian cuisine. Soft cubes of paneer cooked in a luscious tomato-based gravy, infused with spices and butter. It pairs perfectly with naan or rice for a satisfying meal.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Pasta",
      price: 179,
      description:
        "A delicious vegetarian pasta dish made with al dente noodles, sautéed vegetables, and a flavorful sauce. It’s the perfect comfort food, offering a hearty yet healthy meal. The combination of fresh ingredients and Italian seasoning creates a delightful meal.",
    },
    {
      id: null,
      img: "https://media.istockphoto.com/id/516316282/cs/fotografie/indick%C3%A1-masala-sma%C5%BEen%C3%A1-bhindi-nebo-ladyfinger-kari.jpg?s=612x612&w=0&k=20&c=OdzPvN2lp0ffJvwbP56UchL05qjqmjMwWZq97CBavbA=",
      name: "Bhindi Masala",
      price: 199,
      description:
        "This flavorful Indian dish features tender okra (bhindi) cooked with onions, tomatoes, and a variety of spices. It’s a comforting vegetarian curry that pairs perfectly with roti or rice. The spices bring out the earthy flavors of the okra, making it a delightful dish.",
    },
  ];

  const nonVegetarian = [
    {
      id: null,
      img: "https://media.istockphoto.com/id/1317600172/photo/baked-chicken-drumsticks-in-a-bowl-garnished-with-cilantro-and-lemon.webp?a=1&b=1&s=612x612&w=0&k=20&c=zJ2NAlcoii-1MOWZH2ALQhmAMqXQh7KsSszGqz1vjow=",
      name: "Roasted",
      price: 349,
      description:
        "These roasted chicken drumsticks are seasoned with a blend of herbs and spices, then perfectly roasted to achieve a crispy, golden skin. The tender, juicy meat inside makes for a delightful meal. It’s an ideal choice for those who enjoy flavorful, oven-roasted meats.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Chicken",
      price: 249,
      description:
        "Succulent pieces of chicken marinated in aromatic spices, then grilled to perfection. The smokey flavor combined with the spiced marinade creates a juicy and flavorful chicken dish. It’s a perfect option for anyone craving a satisfying, protein-packed meal.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Fried",
      price: 299,
      description:
        "Crispy, golden fried chicken pieces seasoned with a delicious blend of spices. Each bite offers a satisfying crunch followed by juicy, tender meat inside. This dish is perfect for anyone looking for a comforting and indulgent meal.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/12918197/pexels-photo-12918197.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Salmon",
      price: 449,
      description:
        "Grilled to perfection, this salmon is tender and flaky with a crispy skin on the outside. The rich flavors of the fish are complemented by light seasoning and a hint of lemon. It’s a healthy and flavorful option for seafood lovers.",
    },
    {
      id: null,
      img: "https://media.istockphoto.com/id/501266025/photo/seekh-kabab-5.webp?a=1&b=1&s=612x612&w=0&k=20&c=1r-z4KoXCcFJXcEe5Jrky7e2VXyTYX5yfXwip-JVtm8=",
      name: "Lamb Kebabs",
      price: 399,
      description:
        "These juicy lamb kebabs are marinated in a blend of spices, then grilled to perfection. The tender meat is packed with flavor and has a smoky finish from the grill. It’s a great option for those who enjoy rich, meaty flavors with a hint of spice.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/17650171/pexels-photo-17650171/free-photo-of-meal-with-meat-and-rice.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Chicken Tikka",
      price: 269,
      description:
        "Deliciously spiced, marinated chicken pieces grilled until they are juicy and tender. The vibrant red color comes from a mixture of spices like paprika and turmeric, creating a mouthwatering flavor. This dish is perfect when paired with naan or rice for a satisfying meal.",
    },
    {
      id: null,
      img: "https://media.istockphoto.com/id/1003411832/photo/creamy-shrimp-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=I1KG_VFfs3oE8w-7MqgQYpjr-tbYoHLyM5NwbbmWf7U=",
      name: "Shrimp Curry",
      price: 499,
      description:
        "Tender shrimp cooked in a rich, flavorful curry made from coconut milk, tomatoes, and a blend of aromatic spices. The creaminess of the curry balances the shrimp's natural sweetness, making it a comforting and flavorful dish that pairs perfectly with rice.",
    },
    {
      id: null,
      img: "https://images.pexels.com/photos/17650171/pexels-photo-17650171/free-photo-of-meal-with-meat-and-rice.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Mutton Curry",
      price: 549,
      description:
        "This hearty mutton curry is made with tender pieces of mutton cooked in a rich, spicy gravy. The dish is simmered until the meat is soft and flavorful, absorbing all the spices. Ideal for pairing with naan, roti, or rice, it’s a satisfying meal for meat lovers.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase()); // case-insensitive search
  };

  // Filter items based on the search query
  const filteredTopPicks = [
    ...topPicks.filter((item) => item.name.toLowerCase().includes(searchQuery)),
    ...vegetarian.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    ),
    ...nonVegetarian.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    ),
  ];

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userId); // Assuming userId is stored in Redux
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setCartItems(topPicks));
    dispatch(setCartItems(vegetarian));
    dispatch(setCartItems(nonVegetarian));
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/user/getuser");

        if (response.data.success) {
          const userId = response.data.data._id; // Assuming response contains userId
          dispatch(login({ userId })); // Dispatch login with userId
          if (userId) {
            console.log(userId);
            dispatch(getCart(userId)); // Fetch cart if userId exists
          }
        } else {
          dispatch(logout()); // If user is not logged in, dispatch logout
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(logout());
      } finally {
        setLoading(false); // Set loading state to false once the API call is complete
      }
    };

    fetchUser(); // Fetch user data on component mount
  }, [dispatch]); // Empty dependency array means this effect runs only on mount

  if (loading) {
    return <div>Page Loading...</div>; // Loading state
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
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

        {/* name Overlay */}
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

          {/* Search Bar */}
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

      {/* Display filtered items */}
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
            <ImageSlider
              title="Top Picks"
              name={topPicks}
              description="Discover our top culinary selections that you won't want to miss!"
            />
            <ImageSlider
              title="Vegetarian Delights"
              name={vegetarian}
              description="Explore a variety of delicious vegetarian options crafted with the freshest ingredients!"
            />
            <ImageSlider
              title="Non-Vegetarian Delicacies"
              name={nonVegetarian}
              description="Indulge in our mouthwatering non-vegetarian dishes, perfect for meat lovers!"
            />
          </motion.div>
        </div>
      )}

      {/* Testimonials Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Testimonials />
      </motion.div>

      {/* Call to Action Section */}
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
