import React from "react";
import { useSelector } from "react-redux";

import { selectOthers } from "./shareSlice";

export default function Others() {
  const others = useSelector(selectOthers);
  return (
    <div>
      {others.map((other, idx) => (
        <Other key={idx} other={other} />
      ))}
    </div>
  );
}

export function Other({ other }) {
  const { name, hasDevice, intensity } = other;
  return (
    <h1>
      {name}, device: {hasDevice ? "✓" : "🚷"}, intensity: {intensity}
    </h1>
  );
}
