import React from "react";
import { Switch, Route } from "react-router-dom";
import NewDrain from "./NewDrain";
import { TwitterStats } from "./features/twitterStats/TwitterStats";

function App() {
  return (
    <Switch>
      <Route path="/new" component={NewDrain} />
      <Route
        path="/drain/:conversationId/:currency/:perLike/:perComment/:perRetweet/:until"
        component={TwitterStats}
      />
    </Switch>
  );
}

export default App;
