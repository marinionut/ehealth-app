import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Patients from "./Patients";
import Medication from "./Medication";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/patient" component={Patients} />
      <Route path="/medication" component={Medication} />
    </Switch>
  </main>
);

export default Main;
