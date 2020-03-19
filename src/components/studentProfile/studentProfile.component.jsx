import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";
import Button from "react-bootstrap/Button";

import Avatar from "../../accessories/avatar.png";

import "./studentProfile.component.css";

const StudentProfile = props => {
  const {
    public_id,
    first_name,
    last_name,
    email_address,
    faculty,
    department,
    level
  } = props.currentUser;
  return (
    <div className="student-profile-container">
      <h3 className="student-profile-header">Student Profile</h3>
      <div className="student-profile-main-content-container">
        <div className="student-profile-main-content">
          <p className="student-profile-main-content-heading">
            {" "}
            <strong>Name:</strong>
            {` ${last_name.toUpperCase()} ${first_name} `}{" "}
          </p>
          <p className="student-profile-main-content-heading">
            {" "}
            <strong>Level:</strong>
            {` ${level}`}{" "}
          </p>
          <p className="student-profile-main-content-heading">
            {" "}
            <strong>Faculty:</strong>
            {` ${faculty}`}{" "}
          </p>
          <p className="student-profile-main-content-heading">
            {" "}
            <strong>Department:</strong>
            {` ${department}`}{" "}
          </p>
          <p className="student-profile-main-content-heading">
            {" "}
            <strong>Email:</strong>
            {` ${email_address}`}{" "}
          </p>
        </div>
        <div className="student-profile-picture">
          <img src={Avatar} width="100%" height="100%" />
        </div>
      </div>

      <div className="student-page-button-container">
        <Button variant="primary" className="student-page-courses-button">
          <Link
            href="#"
            to={`${props.match.path}/courses`}
            className="student-page-courses-button-link"
          >
            Courses
          </Link>
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(withRouter(StudentProfile));
