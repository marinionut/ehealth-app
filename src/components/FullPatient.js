import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class FullPatient extends React.Component {
  state = {
    patients: []
  };

  componentDidMount() {
    axios
      .get(
        `https://hapi.fhir.org/baseDstu3/Patient?name=john&_sort=birthdate&_pretty=true`
      )
      .then(res => {
        const patients = res.data.entry;
        //console.log(patients);
        this.setState({ patients });
      });
  }

  render() {
    return (
      <table>
        <tr>
          <th>Id</th>
          <th>Nume</th>
          <th>Prenume</th>
          <th>Gen</th>
          <th>Data nasterii</th>
          <th>Detalii pacient</th>
        </tr>
        {this.state.patients.map(patients => (
          <tr>
            <td>
              <Link to={`/patient/${patients.resource.id}`}>
                {patients.resource.id}
              </Link>
            </td>
            <td>{patients.resource.name[0].family}</td>
            <td>{patients.resource.name[0].given[0]}</td>
            <td>{patients.resource.gender}</td>
            <td>{patients.resource.birthDate}</td>
            <td>
              <Link to={`/patient/${patients.resource.id}`}>Detalii</Link>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}
