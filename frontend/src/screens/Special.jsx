import React from "react";
import SpecialItem from "../components/SpecialItem";

// Sample data for special offers organized by category, with images
const categories = {
  BirthdaySpecials: [
    {
      id: 1,
      name: "Party Pizza Pack",
      price: "$19.99",
      description: "Large pizza with garlic bread.",
      image: "https://images.unsplash.com/photo-1551201183-69f72b0a9b3f",
    },
    {
      id: 2,
      name: "Birthday Cake Special",
      price: "$25.00",
      description: "Customizable birthday cake.",
      image: "https://images.unsplash.com/photo-1609920292031-4bc0c9d5c5c1",
    },
    {
      id: 3,
      name: "Chocolate Fountain",
      price: "$15.00",
      description: "Fun chocolate fountain experience.",
      image: "https://images.unsplash.com/photo-1614671578231-86c6aecc01f1",
    },
    {
      id: 4,
      name: "Candy Buffet",
      price: "$12.00",
      description: "A colorful variety of candies.",
      image: "https://images.unsplash.com/photo-1523267284826-275a72a3ee45",
    },
    {
      id: 5,
      name: "Mocktail Party Pack",
      price: "$18.99",
      description: "Assortment of refreshing mocktails.",
      image: "https://images.unsplash.com/photo-1603075820692-bf731ac72099",
    },
  ],
  UnderratedDishes: [
    {
      id: 6,
      name: "Eggplant Parmesan",
      price: "$14.99",
      description: "Breaded eggplant with marinara sauce.",
      image: "https://images.unsplash.com/photo-1629098973249-adeafe216631",
    },
    {
      id: 7,
      name: "Shrimp Scampi",
      price: "$17.99",
      description: "Shrimp in garlic butter sauce.",
      image: "https://images.unsplash.com/photo-1616158922009-001f507af1ef",
    },
    {
      id: 8,
      name: "Lentil Soup",
      price: "$9.99",
      description: "Hearty soup with lentils and veggies.",
      image: "https://images.unsplash.com/photo-1588356762217-689e29095dd7",
    },
    {
      id: 9,
      name: "Quinoa Salad",
      price: "$10.50",
      description: "Nutritious salad with fresh ingredients.",
      image: "https://images.unsplash.com/photo-1580842559199-574cfd4871a8",
    },
    {
      id: 10,
      name: "Stuffed Bell Peppers",
      price: "$13.00",
      description: "Bell peppers filled with rice and spices.",
      image: "https://images.unsplash.com/photo-1603046868297-ceb75f897139",
    },
  ],
  Combos: [
    {
      id: 11,
      name: "Burger Combo",
      price: "$9.99",
      description: "Burger with fries and drink.",
      image: "https://images.unsplash.com/photo-1559187809-a2c9022c3b12",
    },
    {
      id: 12,
      name: "Pizza & Pasta Combo",
      price: "$15.99",
      description: "Half pizza with pasta and drink.",
      image: "https://images.unsplash.com/photo-1575796638176-e91029bd62b9",
    },
    {
      id: 13,
      name: "Sushi & Salad Combo",
      price: "$18.00",
      description: "Sushi with a fresh salad.",
      image: "https://images.unsplash.com/photo-1582593268870-36c7cbbdee3d",
    },
    {
      id: 14,
      name: "Taco Fiesta",
      price: "$14.00",
      description: "Assorted tacos with chips and salsa.",
      image: "https://images.unsplash.com/photo-1527335076325-8cfe98f9a1ca",
    },
    {
      id: 15,
      name: "Sandwich & Smoothie Combo",
      price: "$12.50",
      description: "Sandwich with a fresh smoothie.",
      image: "https://images.unsplash.com/photo-1622403968574-66d1b9c9eeef",
    },
  ],
};

const Special = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-800 to-blue-400 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-extrabold mb-8 text-center">
        Special Offers
      </h2>
      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-bold mb-4 text-yellow-300">
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div className="flex overflow-x-auto space-x-4">
            {categories[category].map((offer) => (
              <SpecialItem key={offer.id} item={offer} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Special;
