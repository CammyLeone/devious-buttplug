import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectOthers, clientVibration } from "./shareSlice";
import { Chip, Section, Text } from "../../layout";

export default function Others() {
  const others = useSelector(selectOthers);
  const dispatch = useDispatch();
  return (
    <Fragment>
      {others.map((other, idx) => (
        <Other
          key={idx}
          other={other}
          setIntensity={(i) =>
            dispatch(clientVibration({ id: other.id, intensity: i }))
          }
        />
      ))}
    </Fragment>
  );
}

export function Other({ other, setIntensity }) {
  const { name, hasDevice, intensity } = other;

  return (
    <Chip>
      <Section padded>
        <Text.Large>{name}</Text.Large>
      </Section>
      <DeviceControl
        hasDevice={hasDevice}
        intensity={intensity}
        setIntensity={setIntensity}
      />
    </Chip>
  );
}

function DeviceControl({ hasDevice, intensity, setIntensity }) {
  if (!hasDevice) {
    return (
      <Section padded attention>
        <Text.Medium>No Device</Text.Medium>
      </Section>
    );
  }

  return (
    <Section padded attention>
      <input
        type="range"
        min="0"
        max="0.9"
        step="0.1"
        value={intensity}
        onChange={(e) => setIntensity(Number(e.target.value))}
        onFocus={() => console.log("onFocus")}
        onBlur={() => console.log("onBlur")}
      />
    </Section>
  );
}
