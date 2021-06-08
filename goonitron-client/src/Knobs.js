import React from "react";
import styled from "styled-components";
import { Speeds, DisplayModes } from "./RotatingImages";

export const SpeedKnob1 = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  background-color: #f3c1c0;
  border-radius: 50%;
  bottom: 25px;
  right: 25px;
  box-shadow: 8px 0px 7px 5px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  &::after {
    content: "+";
  }
`;

export const SpeedKnob = ({ speed, setSpeed }) => (
  <>
    <label htmlFor="speed">speed</label>
    <input
      name="speed"
      value={speed}
      type="range"
      min={0}
      max={Speeds.length - 1}
      onChange={({ target: { value } }) => setSpeed(parseInt(value))}
      step={1}
    />
  </>
);

export const DisplayModeKnob = ({ display, setDisplay }) => (
  <>
    {Object.entries(DisplayModes).map(([name, value]) => (
      <div key={name}>
        <input
          type="radio"
          id={name}
          value={value}
          checked={display === value}
          onChange={({ target: { value } }) => setDisplay(value)}
        />
        <label htmlFor={name}>{name}</label>
      </div>
    ))}
  </>
);
