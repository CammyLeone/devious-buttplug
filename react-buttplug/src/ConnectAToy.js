import React, { useState } from "react";
import useButtPlug from "./useButtPlug";

const DefaultClickToStart = ({ initiateConnection }) => (
  <button onClick={initiateConnection}>Connect a Toy</button>
);
const DefaultClickToStop = ({ stopConnecting }) => (
  <button onClick={stopConnecting}>Stop Connecting</button>
);
const DefaultConnected = () => <span>Connected!</span>;
const DefaultUnsupportedBrowser = () => (
  <span>Use Chrome to connect a toy.</span>
);

export default function ConnectAToy({
  clickToStart = DefaultClickToStart,
  clickToStop = DefaultClickToStop,
  connected = DefaultConnected,
  unsupportedBrowser = DefaultUnsupportedBrowser,
  onNewDevice,
}) {
  const [isReady, setReady] = useState(false);
  const [isConnected, setConnected] = useState(false);

  useButtPlug(isReady, (device) => {
    setConnected(true);
    onNewDevice(device);
  });

  if (!window.Bluetooth) return unsupportedBrowser();
  if (isConnected) return connected();
  if (!isReady)
    return clickToStart({ initiateConnection: () => setReady(true) });
  if (isReady) return clickToStop({ stopConnecting: () => setReady(false) });
  return null;
}
