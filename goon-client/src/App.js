import React, { useState, useCallback } from "react";
import { useVibration } from "react-buttplug";

import { GlobalStyle } from "./Layout";
import AsyncGoon from "./AsyncGoon";
import GetStarted from "./GetStarted";
import RotatingImages, { DisplayModes } from "./RotatingImages";
import { SpeedKnob, DisplayModeKnob, StartOverKnob } from "./Knobs";

function App() {
  const [files, setFiles] = useState([]);
  const [speed, setSpeed] = useState(2);
  const [display, setDisplay] = useState(DisplayModes.FULL);
  const [device, setDevice] = useState(null);
  useVibration(device, (speed / 10) * 2);

  const onFilesReceived = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.reduce((acc, file) => {
        acc[file.path] = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        return acc;
      }, {})
    );
  }, []);

  const hasFiles = !!Object.keys(files).length;
  return (
    <main>
      <GlobalStyle />
      {!hasFiles && (
        <GetStarted onFiles={onFilesReceived} onNewDevice={setDevice} />
      )}
      {hasFiles && (
        <>
          <SpeedKnob speed={speed} setSpeed={setSpeed} />
          <DisplayModeKnob display={display} setDisplay={setDisplay} />
          <StartOverKnob />
          <AsyncGoon
            batchSize={100}
            files={files}
            component={({ urls, preloadMore }) => (
              <RotatingImages
                urls={urls}
                onAllDisplayed={preloadMore}
                displayMode={display}
                speed={speed}
              />
            )}
          />
        </>
      )}
    </main>
  );
}
export default App;
