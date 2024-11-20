import React, { useState } from "react";
import PopUp from "./PopUp"; // PopUp component for displaying item details

const ImageSlider = ({ name, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 6;
  const totalItems = name.length;

  // Move to the next set of items (circular rotation)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closePopUp = () => {
    setSelectedItem(null);
  };

  // Circularly wrap around the array to display the next 6 items
  const getItemsToDisplay = () => {
    let displayItems = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % totalItems; // This ensures circular rotation
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

      {/* Image Slider */}
      <div className="relative">
        <div className="flex overflow-hidden transition-all duration-500 ease-in-out">
          {/* Show 6 items at once */}
          <div className="flex space-x-4">
            {" "}
            {/* Added space between slides */}
            {getItemsToDisplay().map((item, index) => (
              <div
                key={index}
                className="shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-105 mt-2 mb-8"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-36 h-32 md:w-48 md:h-40 lg:w-64 lg:h-56 object-cover bg-white rounded-lg border-2 border-white shadow-md mb-3" // Enlarged image size
                />
                <p className="text-center p-2 text-black bg-green-400 font-transition duration-300 w-36 md:w-48">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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

      {/* Popup for selected item */}
      {selectedItem && <PopUp item={selectedItem} onClose={closePopUp} />}
    </div>
  );
};

export default ImageSlider;
