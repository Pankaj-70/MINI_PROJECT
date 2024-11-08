// HeroSection.js
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const AboutHeroSection = () => {
  const [text] = useTypewriter({
    words: ["Healthy", "Fresh", "Delicious"],
    loop: true,
    delay: 2000,
    deleteSpeed: 50,
  });

  return (
    <div className="pt-24 px-6 bg-blue-950 h-80 w-full text-white font-semibold font-roboto flex flex-col items-center justify-center gap-4">
      <p className="text-3xl sm:text-4xl">We aim to serve</p>
      <h2 className="text-2xl sm:text-3xl bg-gradient-to-br from-[#fc43c7] to-white bg-clip-text text-transparent">
        <span className="text-2xl sm:text-3xl">{text}</span>
        <Cursor />
      </h2>
      <span className="text-2xl sm:text-3xl">food with every order!</span>
    </div>
  );
};

export default AboutHeroSection;
