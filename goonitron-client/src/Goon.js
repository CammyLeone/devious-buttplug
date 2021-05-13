import React, { useState } from "react";
import styled from "styled-components";
import useRandomInterval from "react-random-interval-hook";

const GoonImageContainer = styled.div`
  margin: 0;
  height: 100%;
`;
const GoonImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

const selectRandom = (array) => array[Math.floor(Math.random() * array.length)];
const selectRandomSlice = (size) => (array) => {
  const slice = [];
  while (slice.length < size) {
    slice.push(selectRandom(array));
  }
  return slice;
};

export default function Goon({ files }) {
  const [currentSlice, setCurrentSlice] = useState(
    selectRandomSlice(100)(files).reduce((acc, file) => {
      acc[file.preview] = false;
      return acc;
    }, {})
  );
  const [currentImage, setCurrentImage] = useState(null);

  const isCurrentImage = (image) => currentImage === image;
  // const isCurrentImageLoaded = image => visible={loaded && isCurrentImage(file)}
  const isSliceLoaded = Object.values(currentSlice).every((v) => v);

  useRandomInterval(
    (stop) => {
      setCurrentImage(selectRandom(Object.keys(currentSlice)));
      // if (stopCondition) {
      //   stop();
      // }
    },
    100,
    2000
  ); // interval between 1000 and 2000 ms

  return (
    <GoonImageContainer>
      {Object.entries(currentSlice).map(([file, loaded], idx) => (
        <GoonImage
          key={idx}
          src={file}
          visible={loaded && isCurrentImage(file)}
          onLoad={() => {
            setCurrentSlice({ ...currentSlice, [file]: true });
          }}
          onError={(e) => {
            debugger;
          }}
        />
      ))}
      {!isSliceLoaded && <h1>Loading...</h1>}
    </GoonImageContainer>
  );
}
