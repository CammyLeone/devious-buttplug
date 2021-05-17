import React, { useState, useCallback } from "react";
import styled from "styled-components";
// import useRandomInterval from "react-random-interval-hook";
import useRandomInterval from "./useRandomInterval";

const GoonImageContainer = styled.div`
  margin: 0;
  height: 100%;
`;
const GoonImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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

  useRandomInterval(rotate, 100, 2000);

  return (
    <GoonImageContainer>
      <GoonImage src={current} />
    </GoonImageContainer>
  );
};

export default RotatingImages;
