import React, { useState, useRef } from "react";
import styled from "styled-components";

import { ChalkWriting } from "./Chalkboard";

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
`;

export default function ({ onChange, value }) {
  const inputRef = useRef(null);

  return (
    <div>
      <HiddenInput
        autoFocus
        ref={inputRef}
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
      />
      <ChalkWriting>
        <span onClick={() => inputRef.current.focus()}>{value}</span>
      </ChalkWriting>
    </div>
  );
}
