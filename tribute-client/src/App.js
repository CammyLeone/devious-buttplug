import React from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";

import New from "./New";
import Tribute from "./Tribute";

function App() {
  return (
    <Switch>
      <Route path="/new" component={New} />
      <Route path="/:platform/:user/pay" component={TributeJustPay} />
      <Route path="/:platform/:user" component={TributeWithToy} />
      <Redirect from="/" to="/new" />
    </Switch>
  );
}

function TributeWithToy() {
  const { platform, user } = useParams();
  return <Tribute platform={platform} user={user} withToy />;
}

function TributeJustPay() {
  const { platform, user } = useParams();
  return <Tribute platform={platform} user={user} />;
}

export default App;
