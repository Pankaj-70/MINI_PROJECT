import React, { useState } from "react";

const items = [
  { name: "Pizza of the Day", image: "path/to/pizza-image.jpg" },
  { name: "Burger Combo", image: "path/to/burger-image.jpg" },
  { name: "Pasta Primavera", image: "path/to/pasta-image.jpg" },
  { name: "Dessert Duo", image: "path/to/dessert-image.jpg" },
];

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const spinWheel = () => {
    const newRotation = Math.floor(Math.random() * 360) + 720; // Spin at least 2 full rotations
    setRotation(newRotation);
    const winnerIndex = Math.floor((newRotation % 360) / (360 / items.length));
    setWinner(items[winnerIndex].name);
  };

  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "10px solid #333",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 4s ease-out",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "50%",
              height: "50%",
              transform: `rotate(${
                (360 / items.length) * index
              }deg) translateY(-100%)`,
              textAlign: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", borderRadius: "50%" }}
            />
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <button onClick={spinWheel}>Spin the Wheel!</button>
      {winner && <h2>You won: {winner}</h2>}
    </div>
  );
};

export default SpinWheel;
