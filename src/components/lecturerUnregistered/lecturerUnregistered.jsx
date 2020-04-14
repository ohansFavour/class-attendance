import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { store } from "react-notifications-component";
import Table from "react-bootstrap/Table";
import { withRouter } from "react-router-dom";
import { denormalizeObject } from "../../functions";

import {
  selectCurrentUser,
  selectUnregisteredCourses,
  selectUserType,
  selectUnregisteredCoursesError,
  selectIsLoadingUnregisteredCourses
} from "../../redux/selectors";
import { getCourses, setCourseView } from "../../redux/actions";

import "./lecturerUnregistered.css";

class LecturerUnregistered extends React.Component {
  componentDidMount() {
    this.props.getUnregisteredCourses(
      this.props.mode,
      this.props.currentUser,
      false
    );
  }

  handleRegister = async courseID => {
    const { id, mode } = this.props;

    // Registers a course

    await Axios.put(`/course/${mode}/${id}`, {
      public_id: courseID
    })
      .then(async () => {
        await this.props.getUnregisteredCourses(
          mode,
          this.props.currentUser,
          false
        );
      })
      .catch(error => {
        const message = error.response.data.message
          ? error.response.data.message
          : "Error unregistering course!";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 300,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };

  handleView = course => {
    this.props.setCourseView(course);
    this.props.history.push(`${this.props.match.path}/${course.public_id}`);
  };

  render() {
    const { error, isFetching } = this.props;
    console.log(error);
    return (
      <div className="registered-courses-container">
        {isFetching ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <React.Fragment>
            {!!!error &&
            Array.isArray(this.props.unregisteredCourses) &&
            this.props.unregisteredCourses.length ? (
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Course Title</th>
                    <th>Course Code</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.unregisteredCourses.map(course => {
                    return (
                      <tr key={course.public_id} className="table-row">
                        <td className="table-content-title">
                          {" "}
                          {course.course_title}
                        </td>
                        <td className="table-content"> {course.course_code}</td>
                        {/* <td className="table-content">
                        <Button
                          variant="outline-primary"
                          onClick={() => this.handleView(course)}
                        >
                          View
                        </Button>
                      </td> */}
                        <td className="table-content">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() =>
                              this.handleRegister(course.public_id)
                            }
                          >
                            Register
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : null}
          </React.Fragment>
        )}
        {!!!error &&
        Array.isArray(this.props.unregisteredCourses) &&
        this.props.unregisteredCourses.length === 0 ? (
          <span className="no-registered-course">No unregistered course!</span>
        ) : null}
        {!!error ? <span className="no-registered-course">{error}</span> : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisteredCourses: (currentUser, isRegistered = true) =>
    dispatch(getCourses(currentUser, isRegistered)),
  getUnregisteredCourses: (currentUser, isRegistered = false) =>
    dispatch(getCourses(currentUser, isRegistered)),
  setCourseView: course => dispatch(setCourseView(course))
});
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  unregisteredCourses: denormalizeObject(selectUnregisteredCourses(state)),
  mode: selectUserType(state),
  id: selectCurrentUser(state).public_id,
  error: selectUnregisteredCoursesError(state),
  isFetching: selectIsLoadingUnregisteredCourses(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LecturerUnregistered));
