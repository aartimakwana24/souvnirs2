import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const TimerComponent = ({ date }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // const targetDate = new Date(date);
    const targetDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        clearInterval(interval);
        // Handle timer expiration here if needed
      } else {
        const remainingDays = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24)
        );
        const remainingHours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const remainingMinutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor(
          (timeDifference % (1000 * 60)) / 1000
        );

        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return (
    <div className="d-flex gap-3">
      <div className="d-flex flex-column gap-2 align-items-center">
        <button
          className="btn btn-outline-primary rounded-circle fw-bold"
          style={{ width: "3rem", height: "3rem" }}
        >
          {days}
        </button>
        <span className="fw-bold">DAYS</span>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <button
          className="btn btn-outline-primary rounded-circle fw-bold"
          style={{ width: "3rem", height: "3rem" }}
        >
          {hours}
        </button>
        <span className="fw-bold">HRS</span>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <button
          className="btn btn-outline-primary rounded-circle fw-bold"
          style={{ width: "3rem", height: "3rem" }}
        >
          {minutes}
        </button>
        <span className="fw-bold">MINS</span>
      </div>
      <div className="d-flex flex-column gap-2 align-items-center">
        <button
          className="btn btn-outline-primary rounded-circle fw-bold"
          style={{ width: "3rem", height: "3rem" }}
        >
          {seconds}
        </button>
        <span className="fw-bold">SECS</span>
      </div>
    </div>
  );
};

export default TimerComponent;
