import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createGlobalStyle } from "styled-components";

import AsyncGoon from "./AsyncGoon";

const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }
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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main>
      <GlobalStyle />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* <PreviewFiles files={files} /> */}
      {!!Object.keys(files).length && <AsyncGoon files={files} />}
    </main>
  );
}
export default App;
