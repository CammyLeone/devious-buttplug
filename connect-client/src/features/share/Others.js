import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectOthers, clientVibration } from "./shareSlice";

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
  const { id, name, hasDevice, intensity } = other;
  const dispatch = useDispatch();

  return (
    <h1>
      {name}, device: {hasDevice ? "✓" : "🚷"}, intensity: {intensity}
      {hasDevice && (
        <input
          type="range"
          min="0"
          max="0.9"
          step="0.1"
          value={intensity}
          onChange={(e) =>
            dispatch(clientVibration({ id, intensity: Number(e.target.value) }))
          }
          onFocus={() => console.log("onFocus")}
          onBlur={() => console.log("onBlur")}
        />
      )}
    </h1>
  );
}
