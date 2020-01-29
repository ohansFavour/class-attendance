import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";

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
  console.log(public_id);
  return (
    <div className="student-profile-container">
      <h3 className="student-profile-header">Student Profile</h3>
      <div className="student-profile-main-content-container">
        <div className="student-profile-main-content">
          <p className="student-profile-main-content-heading"> {`Name: ${last_name.toUpperCase()} ${first_name} `} </p>
          <p className="student-profile-main-content-heading"> {`Level: ${level}`} </p>
          <p className="student-profile-main-content-heading">
            {" "}
            {`Faculty: ${faculty}`}{" "}
          </p>
          <p className="student-profile-main-content-heading">
            {" "}
            {`Department: ${department}`}{" "}
          </p>
          <p className="student-profile-main-content-heading"> {`Email: ${email_address}`} </p>
        </div>
        <div className="student-profile-picture">
          <img src={Avatar} width="100%" height="100%"/>
        </div>
      </div>

      <div className="student-page-button-container">
        <button className="student-page-courses-button">
          <Link href="#" to={`${props.match.path}/courses`} className="student-page-courses-button-link">Courses</Link>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(withRouter(StudentProfile));
