import { useState } from "react";
import useButtPlug from "./useButtPlug";

export default function ConnectAToy({ render, onNewDevice }) {
  const [isReady, setReady] = useState(false);

  useButtPlug(isReady, onNewDevice);

  if (!isReady) return render({ initiateConnection: () => setReady(true) });
  return null;
}
