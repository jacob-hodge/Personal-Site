import React, { useEffect, useState } from "react";
import "../styles/ActivityCalendar.css";
import { getActivityData } from "../../helpers/getActivityData";
import { getGithubData } from "../../helpers/getGithubData";

type Padding = { top: number; right: number; bottom: number; left: number };
type CalendarDay = { date: Date };

export const ActivityCalendar: React.FC<{
  padding?: Padding;
}> = ({ padding }) => {
  const pad: Padding = padding || { top: 30, right: 20, bottom: 10, left: 10 };

  const [activityData, setActivityData] = useState<Record<string, boolean>>({});
  const [githubData, setGithubData] = useState<Record<string, boolean>>({});

  useEffect(() => {
    getActivityData().then(setActivityData);
    getGithubData().then(setGithubData);
  }, []);

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
        <a href="https://www.strava.com/athletes/jacobhh" target="_blank" rel="noopener noreferrer">
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
          const key = day.date.toISOString().slice(0, 10);

          const isToday = day.date.toDateString() === today.toDateString();
          const hasActivity = activityData[key] === true;
          const hasGithub = githubData[key] === true;

          return (
            <div
              key={idx}
              className={[
                "calendar-cell",
                isToday ? "today" : "",
                hasActivity ? "has-activity" : "",
                hasGithub ? "has-github" : ""
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
};
