import React from "react";
import "./styles/Desk.css";
import { Keyboard } from "./Keyboard";

export const Desk: React.FC<{
  baseHeight: number;
  scale: number;
}> = ({ baseHeight, scale }) => {
  return (
    <div
      className="desk"
      style={{
        height: baseHeight * scale,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
      }}
    >
      <img
        className="desk-image"
        src="/assets/desk.png"
        alt="Desk"
      />
      <Keyboard/>
    </div>
    
  );
};