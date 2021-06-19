import React from "react";
import { ConnectAToy } from "react-buttplug";
import styled from "styled-components";
import { down } from "styled-breakpoints";
import { useDropzone } from "react-dropzone";
import ButtplugIcon from "./ButtplugIcon";

const GetStartedContainer = styled.div`
  height: 100vh;
  background-color: #f3c1c0;
  color: #ec6e44;
  font-family: Monoton;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const GetStartedContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  padding: 2rem;
  border: 2px solid #ec6e44;
  border-radius: 10px 30px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: "Paytone One";
  &:hover {
    background-color: #f6c8c7;
  }

  ${down("md")} {
    font-size: 0.875rem;
    padding: 1rem;
    margin: 0.25rem;
  }
`;

const GoonText = styled.span`
  font-size: 8rem;
  text-align: center;

  ${down("md")} {
    font-size: 5rem;
  }
`;

function DropFilesHere({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <Button {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {isDragActive
          ? "Drop the files here ..."
          : "Drag 'n' drop some files here, or click to select files"}
      </p>
    </Button>
  );
}
const GetStarted = ({ onFiles, onNewDevice }) => (
  <GetStartedContainer>
    <GetStartedContent>
      <GoonText>Goon</GoonText>
      <DropFilesHere onDrop={onFiles} />
      <ConnectAToy
        onNewDevice={onNewDevice}
        clickToStart={({ initiateConnection }) => (
          <Button onClick={initiateConnection}>
            <ButtplugIcon color="#EC6E44" />
            Connect Your Toy
          </Button>
        )}
        clickToStop={({ stopConnecting }) => (
          <Button onClick={stopConnecting}>Stop Connecting</Button>
        )}
        connected={() => <Button disabled>Connected</Button>}
        unsupportedBrowser={() => (
          <Button disabled>Connect a Toy in Chrome</Button>
        )}
      />
    </GetStartedContent>
  </GetStartedContainer>
);
export default GetStarted;
