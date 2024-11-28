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
    <div className="pl-5 bg-gradient-to-r from-blue-700 to-blue-400 rounded-lg shadow-lg p-4">
      <h2 className="text-3xl pt-6 mb-2 font-bold text-yellow-400 font-roboto">
        {title}
      </h2>
      <p className="text-lg text-gray-200 mb-4 font-poppins">{description}</p>
      <div className="relative">
        <div className="flex overflow-hidden transition-all duration-500 ease-in-out">
          <div className="flex space-x-4">
            {getItemsToDisplay().map((item, index) => (
              <div
                key={index}
                className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-105 mt-2 mb-8"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.img || ""}
                  alt={item.name || "Unnamed"}
                  className="w-36 h-32 md:w-48 md:h-40 lg:w-64 lg:h-56 object-cover bg-white rounded-lg border-2 border-white shadow-md mb-3"
                />
                <p className="text-center p-2 text-black bg-green-400 font-transition duration-300 w-36 md:w-48">
                  {item.name || "Unnamed"}
                </p>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full"
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
