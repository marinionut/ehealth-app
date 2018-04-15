import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Patient extends React.Component {
  state = {
    patient: { name: [{ family: "", given: [] }] },
    encounters: {
      entry: [
        {
          resource: {
            status: "",
            reason: [{ text: "" }],
            type: [{ text: "" }],
            period: { start: "" }
          }
        }
      ]
    },
    carePlan: {
      entry: [
        { resource: { status: "", intent: "", period: { start: "", end: "" } } }
      ]
    },
    appointment: {
      entry: [
        { resource: { status: "", description: "", minutesDuration: "" } }
      ]
    }
  };

  componentWillMount() {
    axios
      .get(
        `https://hapi.fhir.org/baseDstu3/Patient/` +
          this.props.match.params.number
      )
      .then(res => {
        const patient = res.data;
        //console.log(patient);
        this.setState({ patient });
      });

    axios
      .get(
        `https://hapi.fhir.org/baseDstu3/Encounter?patient=` +
          this.props.match.params.number
      )
      .then(res => {
        const encounters = res.data;
        //console.log("e");
        //console.log(encounters);
        if (encounters.hasOwnProperty("entry")) this.setState({ encounters });
      });

    axios
      .get(
        `https://hapi.fhir.org/baseDstu3/CarePlan?patient=` +
          this.props.match.params.number
      )
      .then(res => {
        const carePlan = res.data;
        console.log("c");
        console.log(carePlan);
        if (carePlan.hasOwnProperty("entry")) this.setState({ carePlan });
      });

    axios
      .get(
        `https://hapi.fhir.org/baseDstu3/Appointment?patient=` +
          this.props.match.params.number
      )
      .then(res => {
        const appointment = res.data;
        //console.log("a");
        //console.log(appointment);
        if (appointment.hasOwnProperty("entry")) this.setState({ appointment });
      });
  }

  render() {
    return (
      <div>
        <Link to="/patient">Back</Link>
        <h1>
          {this.state.patient.name[0].family +
            " " +
            this.state.patient.name[0].given[0]}
        </h1>
        <h2>Encounters</h2>
        <table>
          <tr>
            <th>Status</th>
            <th>Reason</th>
            <th>Start date</th>
          </tr>
          {this.state.encounters.entry.map(entry => (
            <tr>
              <td>{entry.resource.status}</td>
              {entry.resource.reason.map(reason => <td>{reason.text}</td>)}
              <td>{entry.resource.period.start}</td>
            </tr>
          ))}
        </table>

        <h2>Appointment</h2>
        <table>
          <tr>
            <th>Status</th>
            <th>Description</th>
            <th>Duration</th>
          </tr>

          {this.state.appointment.entry.map(entry => (
            <tr>
              <td>{entry.resource.status}</td>
              <td>{entry.resource.description}</td>
              <td>{entry.resource.minutesDuration}</td>
            </tr>
          ))}
        </table>

        <h2>Care Plan</h2>
        <table>
          <tr>
            <th>Status</th>
            <th>Intent</th>
            <th>Start</th>
            <th>End</th>
          </tr>

          {this.state.carePlan.entry.map(entry => (
            <tr>
              <td>{entry.resource.status}</td>
              <td>{entry.resource.intent}</td>
              <td>{entry.resource.period.start}</td>
              <td>{entry.resource.period.end}</td>
            </tr>
          ))}
        </table>

        <Link to="/patient">Back</Link>
      </div>
    );
  }
}
