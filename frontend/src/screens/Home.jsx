import React from "react";
import { FaSearch } from "react-icons/fa";
import ImageSlider from "../components/ImageSlider";
import Pizza from "../assets/HomeImages/pizza.png";
import Testimonials from "../components/Testimonials";
import { motion } from "framer-motion";
const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.5 } },
};
const Home = () => {
	const topPicks = [
		{
			img: Pizza,
			content: "Pizza",
		},
		{
			img: "https://t3.ftcdn.net/jpg/05/38/20/62/240_F_538206263_J6N0PMo7117V6hXKRaWm70kebNuHsSnn.jpg",
			content: "Burgers",
		},
		{
			img: "https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc=",
			content: "South Indian",
		},
		{
			img: "https://img.freepik.com/premium-psd/glasses-cola-drink-isolated-transparent-background_436336-1353.jpg?w=740",
			content: "Drinks",
		},
		{
			img: "https://img.freepik.com/premium-photo/pasta-with-tomato-sauce-glass-plate_917710-591.jpg?w=740",
			content: "Italian",
		},
		{
			img: "https://img.freepik.com/free-psd/bowl-biryani-with-chicken-pieces-transparent-background_84443-1317.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Biryani",
		},
		{
			img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
			content: "Sushi",
		},
		{
			img: "https://img.freepik.com/premium-photo/top-view-black-bean-noodles-with-sesame-seeds_1153807-7749.jpg?w=740",
			content: "Noodles",
		},
		{
			img: "https://img.freepik.com/free-photo/vegetables-salad-table_23-2148515515.jpg?t=st=1730289854~exp=1730293454~hmac=df8f8aba2dbba4e764e1df18caba083e774ff42d4d04fcdc4d597aaf1b079f42&w=740",
			content: "Salads",
		},
		{
			img: "https://img.freepik.com/free-photo/delicious-cupcake-with-berries-figs_23-2150798168.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Desserts",
		},
		{
			img: "https://img.freepik.com/premium-photo/delicious-ice-cream-with-topping_216014-10580.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Ice Cream",
		},
		{
			img: "https://img.freepik.com/premium-photo/proper-nutrition-smoothie-freshes-splash-blended-fruit-smoothies-ecological-food-healthy-lifestyle_1029622-116624.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Smoothies",
		},
		{
			img: "https://img.freepik.com/premium-psd/cup-coffee-croissants-isolated-transparent-background_617816-15226.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Breakfast",
		},
		{
			img: "https://img.freepik.com/premium-photo/bowl-soup-with-white-bowl-with-red-pepper-side_1023064-74203.jpg?ga=GA1.1.2025142755.1726374903&semt=ais_hybrid",
			content: "Soup",
		},
	];
	const vegetarian = [
		{
			img: "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Salad",
		},
		{
			img: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Indian",
		},
		{
			img: "https://www.foodiesfeed.com/wp-content/uploads/2016/04/toasted-sandwich-with-pickles.jpg",
			content: "Sandwich",
		},
		{
			img: "https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Pizza",
		},
		{
			img: "https://media.istockphoto.com/id/1158440121/cs/fotografie/zarda-rice-nebo-meethe-chawal.jpg?s=612x612&w=0&k=20&c=xxNOr8NxpV3yM1bLzEowlTu-F_2-a7ZgXb4AyZRof9I=",
			content: "Biryani",
		},
		{
			img: "https://images.pexels.com/photos/9027521/pexels-photo-9027521.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Samosa",
		},
		{
			img: "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Butter paneer",
		},
		{
			img: "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Pasta",
		},
		{
			img: "https://media.istockphoto.com/id/516316282/cs/fotografie/indick%C3%A1-masala-sma%C5%BEen%C3%A1-bhindi-nebo-ladyfinger-kari.jpg?s=612x612&w=0&k=20&c=OdzPvN2lp0ffJvwbP56UchL05qjqmjMwWZq97CBavbA=",
			content: "Bhindi Masala",
		},
	];

	const nonVegetarian = [
		{
			img: "https://media.istockphoto.com/id/1317600172/photo/baked-chicken-drumsticks-in-a-bowl-garnished-with-cilantro-and-lemon.webp?a=1&b=1&s=612x612&w=0&k=20&c=zJ2NAlcoii-1MOWZH2ALQhmAMqXQh7KsSszGqz1vjow=",
			content: "Roasted",
		},
		{
			img: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Chicken",
		},
		{
			img: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Fried",
		},
		{
			img: "https://images.pexels.com/photos/12918197/pexels-photo-12918197.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Salmon",
		},
		{
			img: "https://media.istockphoto.com/id/501266025/photo/seekh-kabab-5.webp?a=1&b=1&s=612x612&w=0&k=20&c=1r-z4KoXCcFJXcEe5Jrky7e2VXyTYX5yfXwip-JVtm8=",
			content: "Lamb Kebabs",
		},
		{
			img: "https://images.pexels.com/photos/17650171/pexels-photo-17650171/free-photo-of-meal-with-meat-and-rice.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Chicken Tikka",
		},
		{
			img: "https://media.istockphoto.com/id/1003411832/photo/creamy-shrimp-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=I1KG_VFfs3oE8w-7MqgQYpjr-tbYoHLyM5NwbbmWf7U=",
			content: "Shrimp Curry",
		},
		{
			img: "https://images.pexels.com/photos/17650171/pexels-photo-17650171/free-photo-of-meal-with-meat-and-rice.jpeg?auto=compress&cs=tinysrgb&w=600",
			content: "Mutton Curry",
		},
	];

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

				{/* Content Overlay */}
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
						className="relative z-10 mt-4 flex flex-col sm:flex-row w-96"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						<input
							type="text"
							placeholder="What’s your pick..."
							className="px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 border-2 hover:border-orange-500 w-full text-center lg:text-left"
						/>
						<button className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-lg sm:text-xl rounded-lg flex items-center justify-center">
							<FaSearch className="text-2xl" />
						</button>
					</motion.div>
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="bg-gradient-to-r from-blue-400 to-purple-400">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeIn}
				>
					<ImageSlider
						title="Top Picks"
						content={topPicks}
						description="Discover our top culinary selections that you won't want to miss!"
					/>
					<ImageSlider
						title="Vegetarian Delights"
						content={vegetarian}
						description="Explore a variety of delicious vegetarian options crafted with the freshest ingredients!"
					/>
					<ImageSlider
						title="Non-Vegetarian Delicacies"
						content={nonVegetarian}
						description="Indulge in our mouthwatering non-vegetarian dishes, perfect for meat lovers!"
					/>
				</motion.div>
			</div>

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
