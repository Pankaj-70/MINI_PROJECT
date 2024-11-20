import React from "react";
import SpecialItem from "../components/SpecialItem";

// Sample data for special offers organized by category, with images
const categories = {
  BirthdaySpecials: [
    {
      id: 1,
      content: "Party Pizza Pack",
      price: 1599,
      description: "Large pizza with garlic bread.",
      img: "https://images.pexels.com/photos/9951852/pexels-photo-9951852.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      content: "Birthday Cake Special",
      price: 2100,
      description: "Customizable birthday cake.",
      img: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      content: "Chocolate Fountain",
      price: 1250,
      description: "Fun chocolate fountain experience.",
      img: "https://media.istockphoto.com/id/495437864/photo/chocolate-fountain-with-fondue-fruits-and-marshmallow-on-children-party.webp?a=1&b=1&s=612x612&w=0&k=20&c=y3l8nsc4iUWMU8oiLBv3IfbtM_Y6gH0e_0tu1f5D0vU=",
    },
    {
      id: 4,
      content: "Candy Buffet",
      price: 1000,
      description: "A colorful variety of candies.",
      img: "https://images.pexels.com/photos/25098396/pexels-photo-25098396/free-photo-of-cake-and-chocolate-on-pink-table.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      content: "Mocktail Party Pack",
      price: 1600,
      description: "Assortment of refreshing mocktails.",
      img: "https://media.istockphoto.com/id/995903658/photo/cocktails-on-the-bar-on-table-counter-with-bar-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZhdXMe7NB86GZABFMaipc-vRaAXUCRmHfs1-X3a85-U=",
    },
  ],
  UnderratedDishes: [
    {
      id: 6,
      content: "Eggplant Parmesan",
      price: 1299,
      description: "Breaded eggplant with marinara sauce.",
      img: "https://plus.unsplash.com/premium_photo-1723579413852-d71dbd8641d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWdncGxhbnQlMjBwYXJtZXNhbnxlbnwwfDB8MHx8fDA%3D",
    },
    {
      id: 7,
      content: "Shrimp Scampi",
      price: 1499,
      description: "Shrimp in garlic butter sauce.",
      img: "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaW1wJTIwc2NhbXBpfGVufDB8MHwwfHx8MA%3D%3D",
    },
    {
      id: 8,
      content: "Lentil Soup",
      price: 999,
      description: "Hearty soup with lentils and veggies.",
      img: "https://media.istockphoto.com/id/1130228942/photo/indian-dal-traditional-indian-soup-lentils-indian-dhal-spicy-curry-in-bowl-spices-herbs.webp?a=1&b=1&s=612x612&w=0&k=20&c=eFoLQ1ohrxR6brCwPGDdyvXN3t5lRCtSPhbcJH10yb4=",
    },
    {
      id: 9,
      content: "Quinoa Salad",
      price: 1050,
      description: "Nutritious salad with fresh ingredients.",
      img: "https://media.istockphoto.com/id/1130228942/photo/indian-dal-traditional-indian-soup-lentils-indian-dhal-spicy-curry-in-bowl-spices-herbs.webp?a=1&b=1&s=612x612&w=0&k=20&c=eFoLQ1ohrxR6brCwPGDdyvXN3t5lRCtSPhbcJH10yb4=",
    },
    {
      id: 10,
      content: "Stuffed Bell Peppers",
      price: 1150,
      description: "Bell peppers filled with rice and spices.",
      img: "https://media.istockphoto.com/id/464583605/photo/stuffed-pepper-with-meat.webp?a=1&b=1&s=612x612&w=0&k=20&c=TCjigfiiHlpM6PCe_IdlmgBlOc8W9C_1IQOeOWwqIuA=",
    },
  ],
  Combos: [
    {
      id: 11,
      content: "Burger Combo",
      price: 1099,
      description: "Burger with fries and drink.",
      img: "https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2VyJTIwY29tYm98ZW58MHwwfDB8fHww",
    },
    {
      id: 12,
      content: "Pizza & Pasta Combo",
      price: 1750,
      description: "Half pizza with pasta and drink.",
      img: "https://media.istockphoto.com/id/1011867672/photo/gnocchi-with-tomato-and-basil-sauce.jpg?s=612x612&w=0&k=20&c=nPD7bmoTIFo9ArILTOuczKnFsBYxrhj92gcIu5ttGuU=",
    },
    {
      id: 13,
      content: "Sushi & Salad Combo",
      price: 2100,
      description: "Sushi with a fresh salad.",
      img: "https://plus.unsplash.com/premium_photo-1710408904251-0395bc68acf3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2h1c2hpJTIwYW5kJTIwc2FsYWR8ZW58MHwwfDB8fHww",
    },
    {
      id: 14,
      content: "Taco Fiesta",
      price: 1450,
      description: "Assorted tacos with chips and salsa.",
      img: "https://images.unsplash.com/photo-1713667417761-408ec68c3af1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFjbyUyMGZpZXN0YXxlbnwwfDB8MHx8fDA%3D",
    },
    {
      id: 15,
      content: "Sandwich & Smoothie Combo",
      price: 1350,
      description: "Sandwich with a fresh smoothie.",
      img: "https://images.unsplash.com/photo-1546497247-c8755e0deb50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZHdpY2glMjBhbmQlMjBzbW9vdGhpZXxlbnwwfDB8MHx8fDA%3D",
    },
  ],
};

const Special = () => {
  return (
    <div className="pt-24 p-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-center font-roboto text-lime-400 text-outline-black drop-shadow-lg animate-fade-in">
        Grab These Sizzling Deals Before They're Gone!
      </h2>

      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-10">
          <h3 className="text-3xl font-serif text-outline-gold mb-2 text-indigo-900 font-semibold">
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <div className="bg-gradient-to-r from-white via-gray-400 to-gray-600 w-full mb-4 h-[0.2rem]"></div>
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
