import React from "react";
import { Switch, Route } from "react-router-dom";

import { Share } from "./features/share/Share";

function App() {
  return (
    <Switch>
      <Route path="/" component={Share} />
      <Route path="/:group" component={Share} />
    </Switch>
  );
}

export default App;
