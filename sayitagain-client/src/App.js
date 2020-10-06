import React, { useState, useRef } from "react";
import { ConnectAToy } from "react-buttplug";

import LineWriter from "./LineWriter";
import {
  Chalkboard,
  WritingArea,
  NotesArea,
  HiddenInput,
  ChalkWriting,
  ChalkButton,
} from "./Chalkboard";

const ChalkInput = () => {
  const [value, setValue] = useState(null);
  const initial = value === null;
  const inputRef = useRef(null);

  return (
    <div>
      <HiddenInput
        autoFocus
        ref={inputRef}
        value={value}
        type="text"
        onChange={(e) => setValue(e.target.value)}
      />
      <ChalkWriting populated={!initial}>
        <span
          onClick={() => {
            if (initial) setValue("");
            inputRef.current.focus();
          }}
        >
          {initial && "Click to start writing..."}
          {!initial && value}
        </span>
      </ChalkWriting>
    </div>
  );
};
function App() {
  const [device, setDevice] = useState(null);

  return (
    <Chalkboard>
      <WritingArea>
        <ChalkInput />
      </WritingArea>
      <NotesArea>
        <section>
          <p>
            <strong>Assignment</strong>
          </p>
          <p>
            You are to write
            <br />
            <em>"I like cock a lot"</em>
            <br />
            <strong>10</strong> times.
          </p>
        </section>
        <section>
          <ConnectAToy
            clickToStart={({ initiateConnection }) => (
              <ChalkButton onClick={initiateConnection}>
                Connect Your Toy
              </ChalkButton>
            )}
            clickToStop={({ stopConnecting }) => (
              <ChalkButton onClick={stopConnecting}>
                Stop Connecting
              </ChalkButton>
            )}
            connected={() => <ChalkButton disabled>Connected</ChalkButton>}
          />
        </section>
      </NotesArea>
    </Chalkboard>
  );

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
