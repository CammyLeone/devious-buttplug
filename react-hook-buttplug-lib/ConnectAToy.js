import React, { useState } from "react";
import { useButtPlug } from "react-hook-buttplug-lib";

export default function ConnectAToy({ onNewDevice }) {
  const [isReady, setReady] = useState(false);

  const { isConnected } = useButtPlug(isReady, onNewDevice);

  if (!isReady)
    return <button onClick={() => setReady(true)}>Make it Interesting</button>;

  if (isConnected) return <h1>Connected</h1>;

  return null;
}
