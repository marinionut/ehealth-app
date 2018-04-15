import React from "react";
import { Switch, Route } from "react-router-dom";
import FullPatient from "./FullPatient";
import Patient from "./Patient";

const Patients = () => (
  <Switch>
    <Route exact path="/patient" component={FullPatient} />
    <Route path="/patient/:number" component={Patient} />
  </Switch>
);

export default Patients;
