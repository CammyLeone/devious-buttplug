import styled, { css } from "styled-components";

const themeAttention = css`
  background-color: pink;
  color: white;
`;

export const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #000;
  &:last-of-type {
    border-bottom: 0;
  }
  ${(props) => props.attention && themeAttention}
  ${(props) => props.padded && `padding: 1rem`}
`;

export const SectionButton = styled.button`
  ${themeAttention}
  width: 100%;
  border: 0;
  padding: 1rem;
`;
