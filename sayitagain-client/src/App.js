import React, { useState } from "react";
import { useButtPlug } from "react-hook-buttplug-lib";

import LineWriter from "./LineWriter";

function App() {
  const [expressedIntentToConnect, setExpressedIntentToConnect] = useState(
    false
  );

  if (expressedIntentToConnect) return <ClickedConnect />;

  return (
    <button onClick={() => setExpressedIntentToConnect(true)}>Click Me</button>
  );
}

function ClickedConnect() {
  const { device, isConnected } = useButtPlug();
  if (!isConnected) return <h1>Not Connected</h1>;

  return <LineWriter device={device} line="I like cock a lot" times={10} />;
}

export default App;
