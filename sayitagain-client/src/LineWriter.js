import React, { useState } from "react";

import { Text } from "./Chalkboard";
import ChalkInput from "./ChalkInput";

function LineWriter({ target, onSuccessfulLine, onTypo }) {
  const [text, setText] = useState("");
  const [initialized, initialize] = useState(false);

  function onChange(value) {
    if (value === target) {
      onSuccessfulLine();
      setText("");
    } else if (!target.startsWith(value)) {
      onTypo(value);
      setText("");
    } else {
      setText(value);
    }
  }

  if (!initialized)
    return (
      <Text huge onClick={() => initialize(true)}>
        Click here to start writing...
      </Text>
    );

  return <ChalkInput type="text" onChange={onChange} value={text} />;
}

export default LineWriter;
