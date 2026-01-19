import React from "react";
import "./styles/Keyboard.css";
import { keys, type KeyData } from "../helpers/keyMap";

export const Keyboard: React.FC = () => {
  return (
    <div className="baseboard">
      <img
        src="/assets/baseboard.png"
        alt="Keyboard"
        className="baseboard-image"
      />
      {keys.map((key: KeyData) => (
          <img
            key={key.id}
            src={key.src}
            alt={key.id}
            className={`key ${key.id}`}
            style={{
              left: `${(key.left / 79) * 100}%`,
              top: `${(key.top / 24) * 100}%`,
              width: `${(key.width / 79) * 100}%`,
              height: `${(key.height / 24) * 100}%`,
            }}
          />
        ))}

    </div>
  );
};