import React, { useState, useCallback } from "react";

import { useDropzone } from "react-dropzone";
import Goon from "./Goon";

function App() {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {/* <PreviewFiles files={files} /> */}
      {!!files.length && <Goon files={files} />}
    </main>
  );
}

const PreviewFiles = ({ files }) => (
  <ul>
    {files.map((file, idx) => {
      return (
        <img
          key={idx}
          src={file.preview}
          style={{
            width: "50px",
            height: "50px",
            padding: "10px",
            display: "inline-block",
          }}
        />
      );
    })}
  </ul>
);
export default App;
