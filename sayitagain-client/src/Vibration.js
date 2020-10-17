import React, { useState } from "react";
import * as d3 from "./d3-bundle";

import { ConnectAToy, useVibration } from "react-buttplug";
import { ChalkButton } from "./style/Chalkboard";

export default function Vibration({ current, max }) {
  const [device, setDevice] = useState(null);
  const scale = d3.scaleLinear().clamp(true).domain([0, max]).range([0, 1]);
  useVibration(device, scale(current));

  return (
    <ConnectAToy
      onNewDevice={setDevice}
      clickToStart={({ initiateConnection }) => (
        <ChalkButton onClick={initiateConnection}>Connect Your Toy</ChalkButton>
      )}
      clickToStop={({ stopConnecting }) => (
        <ChalkButton onClick={stopConnecting}>Stop Connecting</ChalkButton>
      )}
      connected={() => <ChalkButton disabled>Connected</ChalkButton>}
    />
  );
}
