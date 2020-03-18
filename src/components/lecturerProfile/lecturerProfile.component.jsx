import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";

import Avatar from "../../accessories/avatar.png";

import "./lecturerProfile.css";

const LecturerProfile = props => {
  const {
    first_name,
    last_name,
    email_address,
    faculty,
    department,
    level
  } = props.currentUser;
  return (
    <div className="lecturer-profile-container">
      <h3 className="lecturer-profile-header">Lecturer Profile</h3>
      <div className="lecturer-profile-main-content-container">
        <div className="lecturer-profile-main-content">
          <p className="lecturer-profile-main-content-heading">
            {" "}
            <strong>Name:</strong>{" "}
            {` ${last_name.toUpperCase()} ${first_name} `}{" "}
          </p>
          <p className="lecturer-profile-main-content-heading">
            {" "}
            <strong>Level:</strong>
            {` ${level}`}{" "}
          </p>
          <p className="lecturer-profile-main-content-heading">
            {" "}
            <strong>Faculty:</strong>
            {` ${faculty}`}{" "}
          </p>
          <p className="lecturer-profile-main-content-heading">
            {" "}
            <strong>Department:</strong>
            {` ${department}`}{" "}
          </p>
          <p className="lecturer-profile-main-content-heading">
            {" "}
            <strong>Email:</strong>
            {` ${email_address}`}{" "}
          </p>
        </div>
        <div className="lecturer-profile-picture">
          <img src={Avatar} width="100%" height="100%" />
        </div>
      </div>

      <div className="lecturer-page-button-container">
        <Button className="lecturer-page-courses-button">
          <Link
            href="#"
            to={`${props.match.path}/courses`}
            className="lecturer-page-courses-button-link"
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

export default connect(mapStateToProps)(withRouter(LecturerProfile));
