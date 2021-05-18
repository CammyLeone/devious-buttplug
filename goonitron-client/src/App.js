import React, { useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";

import AsyncGoon from "./AsyncGoon";
import DropFilesHere from "./DropFilesHere";

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
        {/* <PreviewFiles files={files} /> */}
        {!!Object.keys(files).length && <AsyncGoon files={files} />}
      </LayoutContainer>
    </main>
  );
}
export default App;
