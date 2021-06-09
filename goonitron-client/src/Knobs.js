import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Range, Direction, getTrackBackground } from "react-range";
import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineReload,
} from "react-icons/ai";
import { GiRabbit } from "react-icons/gi";
import { Speeds, DisplayModes } from "./RotatingImages";

export const KnobCircle = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  background-color: #f3c1c0;
  border-radius: 50%;
  bottom: 1rem;
  right: ${(props) => (props.position - 1) * 3 + 1}rem;
  box-shadow: 8px 0px 7px 5px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

const SpeedRangeContainer = styled.div`
  display: flex;
  align-items: center;
  height: 10rem;
  flex-direction: column;
  position: fixed;
  bottom: 4rem;
  right: 3.2rem;
`;
const STEP = 1;
const MIN = 0;
const MAX = Speeds.length - 1;

export const SpeedRange = ({ rtl, speed, onChange }) => {
  return (
    <SpeedRangeContainer onClick={(e) => e.stopPropagation()}>
      <Range
        direction={Direction.Up}
        values={[speed]}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={([speed]) => onChange(speed)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: index % 2 ? "3px" : "4px",
              width: index % 2 ? "11px" : "16px",
              backgroundColor: index * STEP > MAX - speed ? "#ec6e44" : "#fff",
            }}
          />
        )}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              flexGrow: 1,
              width: "2rem",
              display: "flex",
              height: "300px",
            }}
          >
            <div
              ref={props.ref}
              style={{
                width: "0.25rem",
                height: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: [speed],
                  colors: ["#ec6e44", "#fff"],
                  min: MIN,
                  max: MAX,
                  direction: Direction.Up,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "1rem",
              width: "1rem",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          />
        )}
      />
    </SpeedRangeContainer>
  );
};

const bounce = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }

  50% {
    transform: translateY(-3px) scale(0.8);
  }

  100% {
    transform: translateY(0) scale(1);
  }
`;
const RabbitBounce = styled(GiRabbit)`
  animation: ${(props) => 5.1 - props.speed}s infinite ${bounce};
`;
export const SpeedKnob = ({ speed, setSpeed }) => {
  const [hidden, setHidden] = useState(true);
  return (
    <KnobCircle position={2} onClick={() => setHidden(!hidden)}>
      <RabbitBounce speed={speed} />
      {!hidden && (
        <SpeedRange
          speed={speed}
          onChange={(speed) => {
            setSpeed(speed);
          }}
        />
      )}
    </KnobCircle>
  );
};

export const DisplayModeKnob = ({ display, setDisplay }) => {
  if (display === DisplayModes.ZOOM)
    return (
      <KnobCircle position={1} onClick={() => setDisplay(DisplayModes.FULL)}>
        <AiOutlineZoomOut />
      </KnobCircle>
    );

  return (
    <KnobCircle position={1} onClick={() => setDisplay(DisplayModes.ZOOM)}>
      <AiOutlineZoomIn />
    </KnobCircle>
  );
};

export const StartOverKnob = () => (
  <KnobCircle position={3} onClick={() => window.location.reload()}>
    <AiOutlineReload />
  </KnobCircle>
);
