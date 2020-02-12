import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import Select from "react-select";
import { withRouter } from "react-router-dom";

import { setCurrentUser } from "../../redux/actions";
import { baseURL, proxyurl } from "../../constants";

import "./signUp.css";

const options = [
  { value: "technology", label: "Technology" },
  { value: "arts", label: "Arts" },
  { value: "EDM", label: "EDM" },
  { value: "health sciences", label: "Health Sciences" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "education", label: "Education" },
  { value: "science", label: "Science" },
  { value: "law", label: "Law" },
  { value: "social sciences", label: "Social Sciences" }
];
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicId: "",
      rfId:"",
      firstName: "",
      lastName: "",
      email: "",
      faculty: "",
      department: "",
      level: "",
      password: "",
      selectedOption: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioChange = event => {
    this.setState({
      selectedOption: event.target.value
    });
  };

  handleFaculty = faculty => {
    this.setState({
      faculty: faculty
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      email,
      password,
      selectedOption,
      publicId,
      rfId,
      firstName,
      lastName,
      faculty,
      department,
      level
    } = this.state;
    // proxyurl + 
    await Axios.post(`${proxyurl+baseURL}/${selectedOption}/`, {
      student_id: publicId,
      rf_id: rfId,
      first_name: firstName,
      last_name: lastName,
      email_address: email,
      faculty: faculty.value,
      department: department,
      level: level,
      password: password
    });

    // Go to user login
    this.props.history.push("./");
  };

  render() {
    return (
      <form className="form-container-signUp">
        <h3 className="header-signIn">SignUp</h3>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter First Name"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Last Name"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </div>
        <label>Faculty</label>
        <Select
          value={this.state.faculty}
          onChange={this.handleFaculty}
          options={options}
          placeholder="Select Faculty"
        />
        <br />
        <div className="form-group">
          <label>Department</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Department"
            name="department"
            onChange={this.handleChange}
            value={this.state.department}
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <input
            type="name"
            className="form-control"
            placeholder="Eg. 400"
            name="level"
            onChange={this.handleChange}
            value={this.state.level}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </div>
        <input
          type="radio"
          name="human"
          value="student"
          onChange={this.handleRadioChange}
        />{" "}
        Student
        <br />
        <input
          type="radio"
          name="human"
          value="lecturer"
          onChange={this.handleRadioChange}
        />{" "}
        Lecturer <br />
        <div className="form-group">
        <label>
            RFID
          </label>
          <input
            type="name"
            className="form-control"
            name="rfId"
            onChange={this.handleChange}
            value={this.state.rfId}
          />
          <label>
            {this.state.selectedOption === "student" ? "Matric number" : "ID"}
          </label>
          <input
            type="name"
            className="form-control"
            name="publicId"
            onChange={this.handleChange}
            value={this.state.publicId}
          />
        </div>
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block signin-submit-button"
        >
          Submit
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
