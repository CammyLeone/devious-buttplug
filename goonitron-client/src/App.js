import React, { useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { ConnectAToy, useVibration } from "react-buttplug";

import AsyncGoon from "./AsyncGoon";
import DropFilesHere from "./DropFilesHere";
import RotatingImages, { Speeds, DisplayModes } from "./RotatingImages";
import Knobs from "./Knobs";

const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    background-color: #000;
    color: #FFF;
  }
`;

const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [files, setFiles] = useState([]);
  const [speed, setSpeed] = useState(2);
  const [display, setDisplay] = useState(DisplayModes.FULL);
  const [device, setDevice] = useState(null);
  useVibration(device, (speed / 10) * 2);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.reduce((acc, file) => {
        acc[file.path] = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        return acc;
      }, {})
    );
  }, []);

  return (
    <main>
      <GlobalStyle />
      <LayoutContainer>
        <DropFilesHere onDrop={onDrop} />
        <Knobs
          speed={speed}
          setSpeed={setSpeed}
          display={display}
          setDisplay={setDisplay}
        />
        <ConnectAToy onNewDevice={setDevice} />
        {/* <PreviewFiles files={files} /> */}
        {!!Object.keys(files).length && (
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
        )}
      </LayoutContainer>
    </main>
  );
}
export default App;
