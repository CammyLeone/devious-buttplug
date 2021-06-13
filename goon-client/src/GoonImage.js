import styled from "styled-components";

const ContainedImage = styled.div.attrs(({ src, displayMode }) => ({
  style: {
    backgroundImage: `url(${src})`,
    backgroundSize: displayMode,
  },
}))`
  flex-grow: 1;
  background-repeat: no-repeat;
  background-position: center;
`;

export default ContainedImage;
