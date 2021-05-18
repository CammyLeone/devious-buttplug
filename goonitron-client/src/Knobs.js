import React from "react";
import { Speeds, DisplayModes } from "./RotatingImages";

function Knobs({ speed, setSpeed, display, setDisplay }) {
  return (
    <div>
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
    </div>
  );
}

export default Knobs;
