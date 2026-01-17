import React from "react";
import "./styles/Keyboard.css";

export const Keyboard: React.FC = () => {
  return (
    <div className="baseboard">
      <img
        src="/assets/baseboard.png"
        alt="Keyboard"
        className="baseboard-image"
      />
    </div>
  );
};