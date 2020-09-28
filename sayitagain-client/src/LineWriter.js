import React, { useState, useEffect } from "react";
import { useVibration } from "react-buttplug";

import * as d3 from "./d3-bundle";
import useSelfDismissing from "./hooks/useSelfDismissing";
import useTimesOutIn from "./hooks/useTimesOutIn";

const scale = (times) =>
  d3.scaleLinear().clamp(true).domain([0, times]).range([0, 1]);

const color = (max) =>
  d3.scaleSequential(d3.interpolatePlasma).domain([0, max]);

function LineWriter({ device, line, times }) {
  const [currentTimes, setCurrentTimes] = useState(0);
  const [text, updateText] = useState("");
  const [isWrongShown, showWrong] = useSelfDismissing(1000);
  const [isExpiredShown, showExpired] = useSelfDismissing(1000);
  const [isExpired, resetExpired] = useTimesOutIn(3000);
  useVibration(device, scale(times)(currentTimes));

  useEffect(() => {
    if (!isExpired) return;
    setCurrentTimes(0);
    updateText("");
    showExpired(true);
    resetExpired();
  }, [isExpired, showExpired, resetExpired]);

  function onChange(text) {
    resetExpired();

    if (line === text) {
      setCurrentTimes(currentTimes + 1);
      updateText("");
    } else if (line.startsWith(text)) {
      updateText(text);
    } else {
      setCurrentTimes(0);
      updateText("");
      showWrong(true);
    }
  }

  return (
    <div
      style={{
        color: "#FFF",
        height: "100vh",
        backgroundColor: color(times)(currentTimes),
      }}
    >
      <section>
        <label htmlFor="line">
          <strong>{text}</strong>
          <i>{line.slice(text.length)}</i>
        </label>
      </section>
      <section>
        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={text}
        />
      </section>
      <section>
        {currentTimes} / {times}
      </section>
      {isWrongShown && <h2>WRONG</h2>}
      {isExpiredShown && <h2>EXPIRED</h2>}
    </div>
  );
}

export default LineWriter;
