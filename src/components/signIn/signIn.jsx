import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { setCurrentUser } from "../../redux/actions";
import { baseURL, proxyurl } from "../../constants";
import {
  selectIsFetchingUser,
  selectUserType,
  selectDoneFetching
} from "../../redux/selectors";
import { fetchUserAsync } from "../../redux/sign-in/signinActions";
import "./signIn.css";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      selectedOption: "",
      publicId: ""
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

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password, selectedOption } = this.state;
    this.props.login({
      email: email,
      password: password,
      selectedOption: selectedOption,
      loginUrl: `/auth/${selectedOption}/login`
    });
  };

  render() {
    if (this.props.doneFetching) {
      // Go to user dashboard
      this.props.history.push(`/${this.props.userType}page`);
    }
    return (
      <form className="form-container">
        <h3 className="header-signIn">Login</h3>
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
        Lecturer
        <div className="form-group">
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
        <p className="forgot-password text-right">
          New user?
          <Link to="/signup">
            <a href="#" id="forgot-password-link">
              Sign up
            </a>
          </Link>
        </p>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: selectIsFetchingUser(state),
  doneFetching: selectDoneFetching(state),
  userType: selectUserType(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  login: (data, userType) => dispatch(fetchUserAsync(data, userType))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
