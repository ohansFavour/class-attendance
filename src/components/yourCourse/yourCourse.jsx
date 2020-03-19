import React from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { denormalizeObject } from "../../functions";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import {store} from "react-notifications-component"
import {
  selectCurrentUser,
  selectRegisteredCourses,
  selectCurrentUserMode,
  selectUnregisteredCourses,
  selectIsLoadingRegisteredCourses,
  selectUserType,
  selectRegisteredCoursesError
} from "../../redux/selectors";
import { getCourses, setCourseView } from "../../redux/actions";
import { proxyurl, baseURL } from "../../constants";

import "./yourCourse.css";

class YourCourse extends React.Component {
  componentDidMount() {
    this.props.getRegisteredCourses(this.props.mode, this.props.currentUser);
  }

  handleDelete = async courseID => {
    // Delete Course
    await Axios.delete(`/course/${courseID}`, {
      headers: {
        Accept: "application/json"
      }
    }).then(() => {
      this.props.getRegisteredCourses(this.props.mode, this.props.currentUser);
    }).catch(error=>{
      const message = error.response.data.message
      ? error.response.data.message
      : "Error unregistering course!";
    store.addNotification({
      title: "Error!",
      message: message,
      width: 400,
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
    })
  };

  handleUnregister = async courseID => {
    const { id, mode } = this.props;
    console.log(id, mode, courseID);

    // Unregisters a course
    await Axios.delete(`/course/${mode}/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      data: { public_id: courseID }
    })
      .then(async () => {
        await this.props.getRegisteredCourses(
          mode,
          this.props.currentUser,
          true
        );
      })
      .catch(error => {
        const message = error.response.data.message
          ? error.response.data.message
          : "Error deleting course!";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 400,
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
    const { isFetching, error } = this.props;
    return (
      <div className="registered-courses-container">
        {isFetching ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <React.Fragment>
            {!!!error &&
            Array.isArray(this.props.registeredCourses) &&
            this.props.registeredCourses.length !== 0 ? (
              <table>
                <tr className="table-row-header">
                  <th className="table-content-header">Course Title</th>
                  <th className="table-content-header">Course Code</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                {this.props.registeredCourses.map(course => {
                  return (
                    <tr key={course.public_id} className="table-row">
                      <td className="table-content-title">
                        {" "}
                        {course.course_title}
                      </td>
                      <td className="table-content"> {course.course_code}</td>
                      <td className="table-content">
                        <Button
                          variant="outline-primary"
                          onClick={() => this.handleView(course)}
                        >
                          View
                        </Button>
                      </td>
                      <td className="table-content">
                        <Button
                          variant="outline-primary"
                          onClick={() =>
                            this.handleUnregister(course.public_id)
                          }
                        >
                          Unregister
                        </Button>
                      </td>
                      <td className="table-content delete">
                        <Button
                          variant="outline-danger"
                          onClick={() => this.handleDelete(course.public_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : null}
          </React.Fragment>
        )}

        {!!!error &&
        Array.isArray(this.props.registeredCourses) &&
        this.props.registeredCourses.length === 0 ? (
          <span className="no-registered-course">No registered course!</span>
        ) : null}
        {!!error ? <span className="no-registered-course">{error}</span> : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisteredCourses: (mode, currentUser, isRegistered = true) =>
    dispatch(getCourses(mode, currentUser, isRegistered)),
  getUnregisteredCourses: (currentUser, isRegistered = false) =>
    dispatch(getCourses(currentUser, isRegistered)),
  setCourseView: course => dispatch(setCourseView(course))
});
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  registeredCourses: denormalizeObject(selectRegisteredCourses(state)),
  mode: selectUserType(state),
  id: selectCurrentUser(state).public_id,
  isFetching: selectIsLoadingRegisteredCourses(state),
  error: selectRegisteredCoursesError(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(YourCourse));
