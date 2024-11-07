// SpecialItem.jsx
import React from "react";

const SpecialItem = ({ item }) => {
	return (
		<div className="flex-none w-64 bg-white rounded-lg shadow-md p-4 hover:scale-105 transform transition duration-300 text-black">
			<img
				src={item.image}
				alt={item.name}
				className="w-full h-36 object-cover rounded-lg mb-3"
			/>
			<div className="relative">
				<div className="absolute -top-4 -left-4 bg-yellow-300 text-xs font-bold px-2 py-1 rounded-full shadow-md">
					{item.price}
				</div>
			</div>
			<h4 className="text-xl font-semibold mb-2 text-blue-800">{item.name}</h4>
			<p className="text-gray-700">{item.description}</p>
		</div>
	);
};

export default SpecialItem;
