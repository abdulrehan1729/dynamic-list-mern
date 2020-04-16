import React, { Component } from "react";
import axios from "axios";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state is by default an object
      employes: new Array(),
      addEmploy: false,
      redirectTo: "",
      name: "",
      department: "",
      email: "",
      doj: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post("/", {
        name: this.state.name,
        employeeId: 1001 + this.state.employes.length,
        department: this.state.department,
        email: this.state.email,
        dateOfJoining: this.state.doj,
      })
      .then((response) => {
        let result = {
          name: response.data.name,
          employeeID: response.data.employeeId,
          department: response.data.department,
          email: response.data.email,
          doj: response.data.dateOfJoining,
        };

        this.state.employes.push(result);
        this.setState({ addEmploy: false });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleClick(e) {
    this.setState({ addEmploy: true });
  }
  renderForm() {
    if (this.state.addEmploy) {
      return (
        <form id="contactFrm" name="contactFrm" onSubmit={this.handleSubmit}>
          <div>
            {" "}
            <input
              type="text"
              required
              placeholder="Full Name"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
              className="txt"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Department"
              value={this.state.department}
              name="department"
              onChange={this.handleChange}
              className="txt"
            />
          </div>
          <div>
            <input
              type="email"
              required
              placeholder="Email"
              value={this.state.email}
              name="email"
              onChange={this.handleChange}
              className="txt"
            />
          </div>
          <div>
            <input
              type="date"
              required
              placeholder="Date of Joining"
              value={this.state.doj}
              name="doj"
              onChange={this.handleChange}
              className="txt"
            />
          </div>
          <div>
            <input type="submit" className="txt2" />
          </div>
        </form>
      );
    } else {
      return (
        <button type="button" className="button" onClick={this.handleClick}>
          Add Employee
        </button>
      );
    }
  }
  renderTableData() {
    if (this.state.employes.length > 0) {
      return this.state.employes.map((employ, index) => {
        const { name, employeeID, email, department, doj } = employ; //destructuring
        return (
          <tr key={employeeID}>
            <td>{name}</td>
            <td>{employeeID}</td>
            <td>{department}</td>
            <td>{email}</td>
            <td>{doj}</td>
          </tr>
        );
      });
    }
  }

  renderTableHeader() {
    if (this.state.employes.length > 0) {
      let header = Object.keys(this.state.employes[0]);
      return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderForm()}</div>
        <h1 id="title"> Employes Table</h1>
        <table id="employes">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
