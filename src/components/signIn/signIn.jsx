import React, { Component } from "react";
import Axios from "axios";
import {connect} from "react-redux";

import {setCurrentUser} from "../../redux/actions";

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
  baseURL = ()=>"http://testenv-barebone-flask-rest-api.vpyckwffts.eu-central-1.elasticbeanstalk.com";
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
    const { email, password, selectedOption, publicId } = this.state;

    await Axios.post(
      `${this.baseURL()}/auth/${selectedOption}/login`,
      {
        email: email,
        password: password
      }
    ).then(async () => {
      if (selectedOption === "student") {

        // get the current Student's profile
            
        await Axios.get(`${this.baseURL()}/${selectedOption}/${publicId}`).then((user)=>{
         
        // set the current user state
        
        this.props.setCurrentUser({
          ...user,
          mode: selectedOption
        });

        // Go to user dashboard

        }).catch(error=>{
          // error getting the user
        });

      }
     
    });
  };

  render() {
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
          name="gender"
          value="student"
          onChange={this.handleRadioChange}
        />{" "}
        Student
        <br />
        <input
          type="radio"
          name="gender"
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
      </form>
    );
  }
}

const mapDispatchToProps = dispatch=>({

  setCurrentUser: user => dispatch(setCurrentUser(user))

});
export default connect(null, mapDispatchToProps)(Signin);
