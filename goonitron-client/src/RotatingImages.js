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
      setSeen({ ...seen, [current]: true });
      setCurrent(selectRandom(urls));
      if (Object.keys(seen).length === urls.length) {
        onAllDisplayed();
      }
    },
    [seen, current, urls, onAllDisplayed]
  );

  useRandomInterval(rotate, 30000, 100000);

  return <GoonImage src={current} />;
};

export default RotatingImages;
