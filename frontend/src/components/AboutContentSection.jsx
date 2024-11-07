import React from "react";

const AboutContentSection = ({
	title,
	text,
	imageUrl,
	reverse = false,
	bgColor = "bg-white",
}) => {
	return (
		<div
			className={`pt-20 pb-24 flex flex-col sm:flex-row ${
				reverse ? "sm:flex-row-reverse pr-24" : ""
			} py-12 px-6 gap-16 ${bgColor} w-full pl-24 transition-all duration-500 ease-in-out transform`}
		>
			<div className="w-full sm:w-1/2 text-center sm:text-left animate-fade-in">
				<h3 className="text-2xl font-bold mb-4 animate-slide-in">{title}</h3>
				<p className="text-lg">{text}</p>
			</div>
			<div className="w-full sm:w-1/2 flex justify-center">
				<img
					src={imageUrl}
					alt={title}
					className="rounded-lg shadow-lg w-80 h-48 object-cover sm:w-[30rem] sm:h-80 
					transform transition-transform duration-500 ease-in-out 
					animate-fade-in"
				/>
			</div>
		</div>
	);
};

export default AboutContentSection;
