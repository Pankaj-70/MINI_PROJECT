import React, { useState } from "react";
import PopUp from "./PopUp";

const ImageSlider = ({ name, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 6;
  const totalItems = name?.length || 0;

  const nextSlide = () => {
    if (totalItems > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  const prevSlide = () => {
    if (totalItems > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closePopUp = () => {
    setSelectedItem(null);
  };

  const getItemsToDisplay = () => {
    if (!Array.isArray(name) || name.length === 0) return [];
    let displayItems = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % totalItems;
      displayItems.push(name[index]);
    }
    return displayItems;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-blue-700 to-blue-400 rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-4">
        {title}
      </h2>
      <p className="text-sm md:text-base lg:text-lg text-gray-200 mb-6">
        {description}
      </p>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4">
          {getItemsToDisplay().map((item, index) => (
            <div
              key={index}
              className="flex-none w-36 md:w-48 lg:w-64 cursor-pointer transition-transform transform hover:scale-[1.01] shadow-lg shadow-white"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.img || ""}
                alt={item.name || "Unnamed"}
                className="w-full h-32 md:h-40 lg:h-56 object-cover rounded-lg mb-2  border-2 border-white"
              />
              <div className="bg-green-400 text-black text-center p-2">
                {item.name || "Unnamed"}
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
      {selectedItem && <PopUp item={selectedItem} onClose={closePopUp} />}
    </div>
  );
};

export default ImageSlider;
