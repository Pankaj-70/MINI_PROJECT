import React, { useState, useEffect } from "react";

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
    img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
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
    img: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Chris S.",
    content: "Super easy to order, and the discounts are fantastic!",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDR8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Jessica T.",
    content: "I love how they keep track of my favorite orders.",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDZ8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Sophia L.",
    content: "Fantastic delivery speed and amazing customer support.",
  },
  {
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "James F.",
    content: "The app is easy to use, and the quality is top-notch.",
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDl8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Hannah B.",
    content: "Love the variety of options and great offers.",
  },
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Liam T.",
    content: "Affordable and super convenient for daily meals.",
  },
  {
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Ethan G.",
    content: "Best service I’ve ever used for food delivery.",
  },
  {
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDEwfGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Olivia H.",
    content: "I love their healthy meal options!",
  },
  {
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDl8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Isabella V.",
    content: "Perfect for large family orders!",
  },
  {
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDJ8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Emma R.",
    content: "Great service and amazing discounts!",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDR8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Ava T.",
    content: "Fast delivery every time. Never had an issue!",
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDZ8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Sophie P.",
    content: "I always recommend this service to my friends!",
  },
  {
    img: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Emily C.",
    content: "Amazing service and fresh food every time.",
  },
  {
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg2OHwwfDF8c2VhcmNofDF8fGZhY2V8ZW58MHx8fHw&ixlib=rb-1.2.1&q=80&w=200",
    name: "Ryan G.",
    content: "Perfect for late-night cravings!",
  },
];

const Testimonials = () => {
  const itemsPerPage = 4; // Show 4 testimonials at a time

  return (
    <div className="py-10 bg-gray-50 text-black px-4 md:px-10">
      <h2 className="text-3xl text-center font-bold mb-6">
        What Our Customers Say
      </h2>
      <div className="relative overflow-hidden">
        <div
          className="flex space-x-4 animate-scroll"
          style={{
            animation: "scroll 110s linear infinite",
            width: `${testimonialsData.length * 25}%`, // Adjust width for smooth scrolling
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-500 to-pink-300 shadow-lg rounded-lg w-80 h-72 mx-4 px-8 py-6 text-center"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white"
              />
              <p className="text-gray-800 italic mb-2">
                "{testimonial.content}"
              </p>
              <p className="font-bold text-lg text-gray-900">
                - {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
