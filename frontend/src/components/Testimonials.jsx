import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Sample testimonials data with images
const testimonialsData = [
	{
		img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDV8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "John D.",
		content:
			"The best food delivery service! The quality and variety are outstanding!",
	},
	{
		img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDJ8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Sarah K.",
		content: "Amazing experience! Fast delivery and great food.",
	},
	{
		img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDZ8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Mike P.",
		content:
			"I love the user-friendly interface and the variety of options available.",
	},
	{
		img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDl8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Linda M.",
		content: "The food always arrives hot and fresh. Highly recommend!",
	},
	{
		img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDN8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Tom W.",
		content: "Great customer service! They always listen to feedback.",
	},
	{
		img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDd8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Emma R.",
		content: "Best app for food delivery. I use it every week!",
	},
	{
		img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDh8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Chris S.",
		content: "Super easy to order, and the discounts are fantastic!",
	},
	{
		img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDR8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
		name: "Jessica T.",
		content: "I love how they keep track of my favorite orders.",
	},
];

const Testimonials = () => {
	const settings = {
		infinite: true,
		speed: 10000, // Slow transition speed
		slidesToShow: 3, // Show 3 testimonials at a time
		slidesToScroll: 1,
		autoplay: true, // Automatically move the slides
		autoplaySpeed: 500, // Fast autoplay speed
		pauseOnHover: true, // Pause sliding when hovered
		cssEase: "linear", // Linear easing for transitions
		dots: false, // Remove dots
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div className="py-10 bg-gray-50 text-black px-4 md:px-10">
			<h2 className="text-3xl text-center font-bold mb-6">
				What Our Customers Say
			</h2>
			<Slider {...settings} className="mb-6">
				{testimonialsData.map((testimonial, index) => (
					<div
						key={index}
						className="bg-gradient-to-r from-purple-500 to-pink-300 shadow-lg rounded-lg w-64 h-72 mx-4 px-8 py-6 text-center"
					>
						<img
							src={testimonial.img}
							alt={testimonial.name}
							className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white"
						/>
						<p className="text-gray-800 italic mb-2">"{testimonial.content}"</p>
						<p className="font-bold text-lg text-gray-900">
							- {testimonial.name}
						</p>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Testimonials;
