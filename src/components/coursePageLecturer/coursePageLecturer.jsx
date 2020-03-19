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

  handleAttendanceHistory = async () => {
    const { course, attendance } = this.props;
     console.log(course.public_id)
    if (!!attendance[course.public_id]) {
      //set commit attendance details
      this.props.setCommit(
        attendance[course.public_id].public_id,
        course.public_id
      );
    }
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
              onClick={event =>
                this.handleCreateAttendance(event, course.public_id)
              }
              className="lecturer-course-view-courses-button"
              variant="primary"
            >
              Create Attendance
            </Button>
            <div>
              <Popup
                onOpen={this.handleAttendanceHistory}
                trigger={
                  <Button
                    variant="primary"
                    className="attendance-history-button"
                  >
                    {" "}
                    Attendance History{" "}
                  </Button>
                }
                modal
                closeOnDocumentClick
              >
                <div>
                  {!!!registeredCourses[course.public_id] ? (
                    <span>
                      Sorry, you cannot create an attendance for this course!
                    </span>
                  ) : (
                    <React.Fragment>
                      {!!!attendance[course.public_id] ? (
                        "No attendance session available for this course!"
                      ) : (
                        <React.Fragment>
                          {isLoading ? (
                            <Spinner variant="primary" animation="border" />
                          ) : (
                            <React.Fragment>
                              {!!attendance[course.public_id].commits ? (
                                <div>
                                  <Pop
                                    array={attendance[course.public_id].commits}
                                    courseId={course.public_id}
                                    attendanceId={
                                      attendance[course.public_id].public_id
                                    }
                                    courseCode={course.course_code}
                                  />
                                </div>
                              ) : null}
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              </Popup>
            </div>
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
  setCommit: (attendanceId, courseId) => dispatch(setCommit(attendanceId, courseId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LecturerCourse));
