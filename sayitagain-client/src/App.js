import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import qs from "qs";

import New from "./New";
import Assignment from "./Assignment";

function App() {
  return (
    <Switch>
      <Route path="/new" component={New} />
      <Route path="/:encoded" component={AssignmentDecode} />
      <Route path="/" component={DefaultAssignment} />
    </Switch>
  );
}

const DefaultAssignment = () => (
  <Assignment text="Mr. Grey is a True Dominant" count={5} />
);

function AssignmentDecode() {
  const { encoded } = useParams();
  const decoded = atob(encoded);
  const assignment = qs.parse(decoded);
  return <Assignment text={assignment.text} count={assignment.count} />;
}

export default App;
