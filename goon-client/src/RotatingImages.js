import React, { useState, useCallback } from "react";
import useRandomInterval from "./useRandomInterval";
import GoonImage from "./GoonImage";

const selectRandom = (array) => array[Math.floor(Math.random() * array.length)];

export const DisplayModes = {
  ZOOM: "cover",
  FULL: "contain",
};

export const Speeds = [
  { name: "a", minDuration: 5000, maxDuration: 10000 },
  { name: "b", minDuration: 4000, maxDuration: 8000 },
  { name: "d", minDuration: 1000, maxDuration: 3000 },
  { name: "e", minDuration: 500, maxDuration: 1000 },
  { name: "f", minDuration: 200, maxDuration: 600 },
  { name: "g", minDuration: 100, maxDuration: 300 },
];

const RotatingImages = ({ urls, onAllDisplayed, speed, displayMode }) => {
  const [current, setCurrent] = useState(selectRandom(urls));
  const [seen, setSeen] = useState({ [current]: true });

  const rotate = useCallback(
    (stop) => {
      const unSeen = urls.filter((url) => seen[url] === undefined);
      setSeen({ ...seen, [current]: true });
      if (unSeen.length === 0) {
        setCurrent(selectRandom(urls));
        onAllDisplayed();
      } else {
        setCurrent(selectRandom(unSeen));
      }
    },
    [seen, urls, current, onAllDisplayed]
  );

  useRandomInterval(
    rotate,
    Speeds[speed].minDuration,
    Speeds[speed].maxDuration
  );

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div style={{ fontSize: 12, marginTop: -5 }}>
        {Object.keys(seen).length} / {urls.length}
      </div>
      <GoonImage src={current} displayMode={displayMode} />
    </div>
  );
};

export default RotatingImages;
