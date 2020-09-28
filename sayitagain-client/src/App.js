import React, { useState } from "react";
import { ConnectAToy } from "react-buttplug";

import LineWriter from "./LineWriter";

function App() {
  const [device, setDevice] = useState(null);

  if (!device)
    return (
      <ConnectAToy
        render={({ initiateConnection }) => (
          <button onClick={initiateConnection}>Write some Lines</button>
        )}
        onNewDevice={setDevice}
      />
    );

  return <LineWriter device={device} line="I like cock a lot" times={10} />;
}

export default App;
