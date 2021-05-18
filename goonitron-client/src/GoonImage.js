import React from "react";
import styled from "styled-components";

const ContainedImage = styled.div.attrs(({ src, fill }) => ({
  style: {
    backgroundImage: `url(${src})`,
    backgroundSize: fill ? "cover" : "contain",
  },
}))`
  flex-grow: 1;
  background-repeat: no-repeat;
  background-position: center;
`;

export default ({ fill, src, children }) => {
  return (
    <ContainedImage src={src} fill={fill}>
      {children}
    </ContainedImage>
  );
};
