import styled, { keyframes, css } from "styled-components";
import * as d3 from "d3-scale";

const scale = d3
  .scalePow()
  .exponent(0.8)
  .clamp(true)
  .domain([1, 0])
  .range([0.1, 2]);

const animationIntensity = (intensity) => {
  return scale(intensity);
};

const ring = keyframes`
  0% {
    box-shadow: 0 0 30px #FFF;
  }
  100% {
    box-shadow: 0 0 0px #FFF;
  }
`;

const animation = css`
  animation: ${ring} infinite;
`;

export default styled.a.attrs((props) => ({
  style: {
    animationDuration: `${animationIntensity(props.intensity)}s`,
  },
}))`
  cursor: pointer;
  display: block;
  text-decoration: none;
  text-transform: uppercase;

  line-height: 1.4em;
  padding: 10px 50px;

  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border: solid 2px;
  border-color: rgba(255, 255, 255, 0.3);

  transition: background-color 0.4s ease 0s;
  transition: border-color 0.4s ease 0s;

  ${(props) => props.glow && animation};

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: #fff;
  }
`;
