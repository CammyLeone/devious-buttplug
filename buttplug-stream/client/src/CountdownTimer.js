import React, { useEffect, useState, useCallback } from "react";
import { DateTime, Interval } from "luxon";

const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    console.log("running the effect");
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]); // Make sure the effect runs only once
};

function calculateTimeLeft(untilMillis) {
  const interval = Interval.fromDateTimes(
    DateTime.local(),
    DateTime.fromMillis(untilMillis)
  );
  const duration = interval
    .toDuration(["days", "hours", "minutes", "seconds"])
    .toObject();
  duration.seconds = Math.floor(duration.seconds);
  const { days, hours, minutes, seconds } = duration;

  const infl = (unit, amt) => (amt > 1 ? `${unit}s` : unit);

  let str = "";
  if (days) str += `${days} ${infl("day", days)}`;
  if (days && (hours || minutes || seconds)) str += ", ";
  if (hours) str += `${hours} ${infl("hour", hours)}`;
  if (hours && (minutes || seconds)) str += ", ";
  if (minutes) str += `${minutes} ${infl("minute", minutes)}`;
  if (minutes && seconds) str += ", ";
  if (seconds) str += `${Math.floor(seconds)} ${infl("second", seconds)}`;
  return str;
}

export default function CountdownTimer({ until }) {
  const [timeLeft, setTimeLeft] = useState(0);

  const counterCallback = useCallback(
    (deltaTime) => {
      setTimeLeft(calculateTimeLeft(until));
    },
    [until]
  );

  useAnimationFrame(counterCallback);

  return <h1>Time left: {timeLeft}</h1>;
}
