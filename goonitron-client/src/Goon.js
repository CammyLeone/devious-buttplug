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
      acc[file.preview] = { file, loaded: false };
      return acc;
    }, {})
  );
  const [currentImage, setCurrentImage] = useState(null);

  const isCurrentImage = (image) => {
    if (currentImage && !currentImage.file) debugger;
    return !!currentImage && currentImage.file.preview === image.preview;
  };
  const isSliceLoaded = Object.values(currentSlice).every((v) => v.loaded);
  const remainingUnloaded = Object.values(currentSlice).filter(
    (v) => !v.loaded
  );

  useRandomInterval(
    (stop) => {
      setCurrentImage(selectRandom(Object.values(currentSlice)));
      // if (stopCondition) {
      //   stop();
      // }
    },
    100,
    2000
  ); // interval between 1000 and 2000 ms

  return (
    <GoonImageContainer>
      {Object.values(currentSlice).map(({ file, loaded }, idx) => (
        <GoonImage
          key={idx}
          src={file.preview}
          visible={loaded && isCurrentImage(file)}
          onLoad={() => {
            setCurrentSlice({
              ...currentSlice,
              [file.preview]: { file, loaded: true },
            });
          }}
          onError={(e) => {
            debugger;
          }}
        />
      ))}
      {currentImage && <h3>Current image: {currentImage.file.path}</h3>}
      {!isSliceLoaded && <h1>Loading...</h1>}
    </GoonImageContainer>
  );
}
