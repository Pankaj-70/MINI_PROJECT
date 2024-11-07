import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ content, title, description }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		appendDots: (dots) => (
			<div style={{ padding: "10px" }}>
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</div>
		),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 3,
				},
			},
		],
	};

	return (
		<div className="pl-5 bg-gradient-to-r from-blue-700 to-blue-400 rounded-lg shadow-lg p-4">
			<h2 className="text-3xl  pt-6 mb-2 font-bold text-yellow-400 font-roboto">
				{title}
			</h2>
			<p className="text-lg text-gray-200 mb-4 font-poppins">{description}</p>
			<div className="pl-4 pr-6">
				<Slider {...settings} className="mb-6">
					{content.map((item, index) => (
						<div
							key={index}
							className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-105 mt-2 mb-8"
						>
							<img
								src={item.img}
								alt={item.content}
								className="w-28 h-24 md:w-40 md:h-36 object-cover bg-white rounded-lg border-2 border-white shadow-md mb-3"
							/>
							<p className="text-center p-2 text-black bg-green-400 font-transition duration-300 w-28 md:w-40">
								{item.content}
							</p>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default ImageSlider;
