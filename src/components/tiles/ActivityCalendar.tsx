import React from "react";
import "../styles/ActivityCalendar.css";

type Padding = { top: number; right: number; bottom: number; left: number };
type CalendarDay = {
  date: Date;
};

export const ActivityCalendar: React.FC<{
  padding?: Padding;
}> = ({ padding }) => {
  const pad: Padding = padding || { top: 30, right: 20, bottom: 10, left: 10 };

  const today = new Date();
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay() + 1 - 28);
  const days: CalendarDay[] = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(firstDay);
    d.setDate(firstDay.getDate() + i);
    days.push({ date: d });
  }

  return (
    <div
      className="calendar-tile"
      style={{
        paddingTop: pad.top,
        paddingRight: pad.right,
        paddingBottom: pad.bottom,
        paddingLeft: pad.left,
      }}
    >
      <div className="calendar-logos">
        <a href="https://github.com/jacob-hodge" target="_blank" rel="noopener noreferrer">
          <img src="/github.svg" alt="GitHub" className="github logo" />
        </a>
        <a href="https://www.strava.com/athletes/29710746" target="_blank" rel="noopener noreferrer">
          <img src="/strava.svg" alt="Strava" className="strava logo" />
        </a>
      </div>

      <div className="calendar-header">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
          <div key={idx} className="weekday">{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, idx) => {
          const isToday = day.date.toDateString() === today.toDateString();
          return (
            <div
              key={idx}
              className={`calendar-cell ${isToday ? "today" : ""}`}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
};
