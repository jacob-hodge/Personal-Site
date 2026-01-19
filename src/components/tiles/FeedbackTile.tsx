import React, { useState, useEffect } from "react";
import "../styles/FeedbackTile.css";

type Padding = { top: number; right: number; bottom: number; left: number };

export const FeedbackTile: React.FC<{ padding?: Padding }> = ({ padding }) => {
  const pad: Padding = padding || { top: 35, right: 25, bottom: 10, left: 10 };
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyEl = document.querySelector<HTMLElement>(`.key.${e.code}`);
      if (keyEl) keyEl.style.transform = "translateY(8px)";
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyEl = document.querySelector<HTMLElement>(`.key.${e.code}`);
      if (keyEl) keyEl.style.transform = "translateY(0)";
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  return (
    <div
      className="feedback-tile"
      style={{
        paddingTop: pad.top,
        paddingRight: pad.right,
        paddingBottom: pad.bottom,
        paddingLeft: pad.left,
      }}
    >
      <div className="feedback-header">
        <h1>Feedback</h1>
      </div>

      <textarea
        className="feedback-textarea"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
      />

      <button className="feedback-submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
