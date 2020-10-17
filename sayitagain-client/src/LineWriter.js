import React, { useState } from "react";
import styled from "styled-components";

const ChalkInputText = styled.textarea`
  font-size: 4rem;
  font-family: "Gloria Hallelujah";
  color: #fff;
  background: transparent;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
`;

function LineWriter({ target, onSuccessfulLine, onTypo }) {
  const [text, setText] = useState("");
  const [initialized, initialize] = useState(false);

  function onChange(value) {
    if (!initialized) initialize(true);

    if (value === target) {
      onSuccessfulLine();
      setText("");
    } else if (target.startsWith(value) || value.length < 3) {
      setText(value);
    } else {
      onTypo(value);
      setText("");
    }
  }

  return (
    <ChalkInputText
      autoFocus
      value={text}
      type="text"
      placeholder={!initialized && "Start writing here..."}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default LineWriter;
