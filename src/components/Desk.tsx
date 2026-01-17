import React from "react";
import "./styles/Desk.css";

export const Desk: React.FC<{
  height: number;
}> = ({ height }) => {
  return (
    <div className="desk" style={{ height }}>
      <img
        className="desk-image"
        src="/assets/desk.png"
        alt="Desk"
      />
    </div>
  );
};