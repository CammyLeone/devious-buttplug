import React from "react";
import styled from "styled-components";

const ContainedImage = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.src});
`;

const FillContainer = styled.div`
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  & div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 50%;
    min-height: 50%;
    background-image: url(${(props) => props.src});
  }
`;

export default ({ fill, src }) => {
  if (fill)
    return (
      <FillContainer src={src}>
        <div />
      </FillContainer>
    );

  return <ContainedImage src={src} />;
};
