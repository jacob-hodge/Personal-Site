import React from "react";
import "../styles/AboutTile.css";

type Padding = { top: number; right: number; bottom: number; left: number };

export const AboutTile: React.FC<{
  padding?: Padding;
}> = ({ padding }) => {
  const pad: Padding = padding || { top: 40, right: 55, bottom: 10, left: 10 };

  return (
    <div
      className="about-tile"
      style={{
        paddingTop: pad.top,
        paddingRight: pad.right,
        paddingBottom: pad.bottom,
        paddingLeft: pad.left,
      }}
    >
      <div className="about-content">
        <h1>ABOUT</h1>

        <p>First panel has ECG data - from watch</p>
        <p>Second panel is empty</p>
        <p>Third panel is empty</p>
        <p>Fourth panel is empty</p>
        <p>Testing scroll</p>
      </div>
    </div>
  );
};
