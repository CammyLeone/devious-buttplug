import React, { useState, useCallback } from "react";
// import useRandomInterval from "react-random-interval-hook";
import useRandomInterval from "./useRandomInterval";
import GoonImage from "./GoonImage";

const selectRandom = (array) => array[Math.floor(Math.random() * array.length)];

const RotatingImages = ({ urls, onAllDisplayed }) => {
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

  useRandomInterval(rotate, 500, 500);

  return (
    <>
      <div style={{ fontSize: 12, marginTop: -5 }}>
        {Object.keys(seen).length} / {urls.length}
      </div>
      <GoonImage src={current} fill />
    </>
  );
};

export default RotatingImages;
