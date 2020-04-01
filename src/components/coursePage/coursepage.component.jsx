import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link, withRouter } from "react-router-dom";

import { selectCourse } from "../../redux/selectors";

import "./coursepage.styles.css";

class Course extends React.Component {
  handleBack = () => {
    this.props.history.goBack();
  };
  handleAttendance=()=>{
    this.props.history.push("/studentPage/attendance")
  }
  render() {
    const { course } = this.props;
    return (
      <React.Fragment>
        <div className="course-view-container">
          <div className="course-view-main-content">
            <h1 className="header-course">Course Profile</h1>
            <p className="course-view-main-content-heading">
              <strong>Course Title:</strong>
              {` ${course.course_title}`}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              <strong>Course Code:</strong>
              {` ${course.course_code}`}{" "}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              <strong>Faculty:</strong>
              {` ${course.faculty}`}{" "}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              <strong>Department:</strong>
              {` ${course.department}`}{" "}
            </p>
          </div>
          <div className="course-view-button-container">
            <Button className="course-view-courses-button" variant="outline-primary" onClick={this.handleBack}>Back</Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  course: selectCourse(state)
});
export default connect(mapStateToProps)(withRouter(Course));
