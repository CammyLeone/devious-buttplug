import React, { useState, Fragment } from "react";

import LineWriter from "./LineWriter";
import Vibration from "./Vibration";
import { Chalkboard, WritingArea, NotesArea, Text } from "./Chalkboard";

function App({ assignment }) {
  const [lines, setLines] = useState([]);
  const [successfulCount, setSuccessfulCount] = useState(0);

  return (
    <Chalkboard>
      <WritingArea>
        <LineWriter
          target={assignment.text}
          onSuccessfulLine={() => {
            setLines([
              ...lines,
              { status: "success", content: assignment.text },
            ]);
            setSuccessfulCount(successfulCount + 1);
          }}
          onTypo={(content) => {
            setLines([...lines, { status: "typo", content }]);
            setSuccessfulCount(0);
          }}
        />
        <Lines lines={[...lines].reverse()} />
      </WritingArea>
      <NotesArea>
        <section>
          <Assignment text={assignment.text} count={assignment.count} />
        </section>
        <section>
          <Count current={successfulCount} total={assignment.count} />
        </section>
        <section>
          <Vibration current={successfulCount} max={assignment.count} />
        </section>
      </NotesArea>
    </Chalkboard>
  );
}

const Lines = ({ lines }) => (
  <Fragment>
    {lines.map(({ status, content }, idx) => (
      <Text as="p" large muted lineThrough={status === "typo"} key={idx}>
        {content}
      </Text>
    ))}
  </Fragment>
);

const Assignment = ({ text, count }) => (
  <Fragment>
    <Text large>Assignment:</Text>
    <Text normal>You are to write</Text>
    <Text large>"{text}"</Text>
    <Text normal>{count} times.</Text>
  </Fragment>
);

const Count = ({ current, total }) => (
  <Fragment>
    <Text normal> You have </Text>
    <Text large>{Math.max(0, total - current)}</Text>
    <Text normal>lines to go.</Text>
  </Fragment>
);

export default App;
