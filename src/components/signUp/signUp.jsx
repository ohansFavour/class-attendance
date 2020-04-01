import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { setCurrentUser } from "../../redux/actions";
import {
  createNewStudentAsync,
  reset
} from "../../redux/student/studentActions";
import { selectUserCreated, selectIsCreatingUser } from "../../redux/selectors";

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
      rfId: "",
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
  componentDidMount() {
    this.props.reset();
  }
  componentWillUnmount() {
    //reset
    this.props.reset();
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

  handleHome = () => {
    this.props.history.push("./");
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

    // createNewStudent
    if (selectedOption === "student") {
      this.props.createNewStudent({
        details: {
          student_id: publicId,
          rf_id: rfId,
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          faculty: faculty.value,
          department: department,
          level: level,
          password: password
        },
        url: `/${selectedOption}/`
      });
    }

    if (selectedOption === "lecturer") {
      this.props.createNewStudent({
        details: {
          lecturer_id: publicId,
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          faculty: faculty.value,
          department: department,
          level: level,
          password: password
        },
        url: `/${selectedOption}/`
      });
    }
  };

  render() {
    if (this.props.userCreated) {
      // Go to user login
      this.props.history.push("./");
    }
    const { isCreating } = this.props;
    return (
      <div className="sign-up-view">
        <div className="sign-up-page-container-view">
          {isCreating ? (
            <Spinner variant="primary" className="spinner" animation="border" />
          ) : (
            <React.Fragment>
              <div className="sign-up-page-fixed"> </div>
              <form className="form-container-signUp">
                <h3 className="header-signIn">Sign Up</h3>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="name"
                    className="form-control"
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
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
                  {this.state.selectedOption === "student" ? (
                    <React.Fragment>
                      <label>RFID</label>
                      <input
                        type="name"
                        className="form-control"
                        name="rfId"
                        onChange={this.handleChange}
                        value={this.state.rfId}
                      />
                    </React.Fragment>
                  ) : null}

                  <label>
                    {this.state.selectedOption === "student"
                      ? "Matric number"
                      : "ID"}
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
                <div className=" home-button-sign-up-container">
                  <Button
                    className=" home-button-sign-up"
                    onClick={this.handleHome}
                    variant="outline-success"
                  >
                    home
                  </Button>
                </div>
              </form>
              <div className="sign-up-page-fixed"> </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  createNewStudent: data => dispatch(createNewStudentAsync(data)),
  reset: () => dispatch(reset())
});

const mapStateToProps = state => ({
  userCreated: selectUserCreated(state),
  isCreating: selectIsCreatingUser(state)
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
