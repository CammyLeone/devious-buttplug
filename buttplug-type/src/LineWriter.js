import React, { useState, useEffect } from "react";

import * as d3 from "./d3-bundle";
import Vibrate from "./Vibrate";

const scale = (times) =>
  d3.scaleLinear().clamp(true).domain([0, times]).range([0, 1]);

const color = (max) =>
  d3.scaleSequential(d3.interpolatePlasma).domain([0, max]);

function useSelfDismissing(timeout) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (shown) setTimeout(() => setShown(false), timeout);
  }, [shown, timeout]);

  return [shown, setShown.bind(true)];
}

function useTimesOutIn(millis) {
  const [mostRecent, setMostRecent] = useState(null);
  const [isExpired, setExpired] = useState(false);
  const timeout = React.useRef(null);
  useEffect(() => {
    if (isExpired) return;

    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setExpired(true), millis);
  }, [mostRecent, isExpired, millis]);

  const resetExpired = () => {
    setExpired(false);
    setMostRecent(Date.now());
  };
  return [isExpired, resetExpired];
}

function LineWriter({ device, line, times }) {
  const [currentTimes, setCurrentTimes] = useState(0);
  const [text, updateText] = useState("");
  const [isWrongShown, showWrong] = useSelfDismissing(1000);
  const [isExpiredShown, showExpired] = useSelfDismissing(1000);
  const [isExpired, resetExpired] = useTimesOutIn(3000);

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
      <Vibrate device={device} level={scale(times)(currentTimes)} on />
    </div>
  );
}

export default LineWriter;
