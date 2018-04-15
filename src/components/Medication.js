import React from "react";

import axios from "axios";

export default class Medication extends React.Component {
  state = {
    medication: []
  };

  componentDidMount() {
    axios.get(`https://hapi.fhir.org/baseDstu3/Medication`).then(res => {
      const medication = res.data.entry;
      //console.log(medication);
      this.setState({ medication });
    });
  }

  render() {
    return (
      <table>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>System</th>
        </tr>
        {this.state.medication.map(medication => (
          <tr>
            <td>{medication.resource.code.coding[0].code}</td>
            <td>{medication.resource.code.coding[0].display}</td>
            <td>{medication.resource.code.coding[0].system}</td>
          </tr>
        ))}
      </table>
    );
  }
}
