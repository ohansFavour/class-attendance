import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import Spinner from "react-bootstrap/Spinner";

import Pop from "../popup/popup";
import {
  selectCourse,
  selectRegisteredCourses,
  selectAttendanceObject,
  selectAttendanceIsLoading
} from "../../redux/selectors";

import { setCommit } from "../../redux/actions";

import "./coursePageLecturer.css";

class LecturerCourse extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreateAttendance = (event, courseId) => {
    event.preventDefault();

    // move to attendance page
    this.props.history.push(`./${courseId}/attendance`);
  };

  handleAttendanceHistory = async (event, courseId) => {
    event.preventDefault();
    this.props.history.push(`./${courseId}/attendance-history`);
  };

  render() {
    const { course, registeredCourses, attendance, isLoading } = this.props;
    return (
      <React.Fragment>
        <div className="lecturer-course-view-container">
          <div className="lecturer-course-view-main-content">
            <h2 className="course-lecturer-header">Course Profile</h2>
            <p className="lecturer-course-view-main-content-heading">
              <span className="lecturer-course-span">Course Title</span>
              {`: ${course.course_title}`}
            </p>
            <p className="lecturer-course-view-main-content-heading">
              {" "}
              <span className="lecturer-course-span">Course Code</span>{" "}
              {`: ${course.course_code}`}{" "}
            </p>
            <p className="lecturer-course-view-main-content-heading">
              {" "}
              <span className="lecturer-course-span">Faculty</span>
              {`: ${course.faculty}`}{" "}
            </p>
            <p className="lecturer-course-view-main-content-heading">
              {" "}
              <span className="lecturer-course-span">Department</span>{" "}
              {`: ${course.department}`}{" "}
            </p>
          </div>
          <div className="lecturer-course-view-button-container">
            <Button
            size="sm"
              onClick={event =>
                this.handleCreateAttendance(event, course.public_id)
              }
              className="lecturer-course-view-courses-button"
              variant="primary"
            >
              Create Attendance
            </Button>
            <Button
            size="sm"
              onClick={event =>
                this.handleAttendanceHistory(event, course.public_id)
              }
              className="attendance-history-button"
              variant="primary"
            >
              Attendance History
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  course: selectCourse(state),
  registeredCourses: selectRegisteredCourses(state),
  attendance: selectAttendanceObject(state),
  isLoading: selectAttendanceIsLoading(state)
});
const mapDispatchToProps = dispatch => ({
  setCommit: (attendanceId, courseId) =>
    dispatch(setCommit(attendanceId, courseId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LecturerCourse));
