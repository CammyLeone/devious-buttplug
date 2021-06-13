import React from "react";
import styled from "styled-components";
const SVG = styled.svg`
  width: 2rem;
  height: 2rem;
  padding-right: 1rem;
`;
export default ({ color }) => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="20 12.5 60 75">
    <title>Buttplug</title>
    <path
      stroke={color}
      fill={color}
      d="M70,46c0-9.94-12.9-28-20-28S30,36.06,30,46A20,20,0,0,0,46,65.6V74H34v8H66V74H54V65.6A20,20,0,0,0,70,46ZM38,46c0-6.44,8.6-17.64,12-19.79C53.4,28.36,62,39.56,62,46a12,12,0,0,1-24,0Z"
    />
  </SVG>
);
