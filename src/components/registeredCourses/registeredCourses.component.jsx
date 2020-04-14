import React from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import {
  selectCurrentUser,
  selectRegisteredCourses,
  selectUserType
} from "../../redux/selectors";
import { getCourses, setCourseView } from "../../redux/actions";

import "./registeredCourses.component.css";

import { denormalizeObject } from "../../functions";

class RegisteredCourses extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  handleUnregister = async courseID => {
    const { mode, currentUser } = this.props;
    await Axios.delete(`/course/${this.props.mode}/${this.props.id}`, {
      public_id: courseID
    }).then(() => {
      this.props.getUnregisteredCourses(mode, currentUser);
      this.props.getRegisteredCourses(mode, currentUser);
    });
  };

  handleView = course => {
    this.props.setCourseView(course);
    this.props.history.push(`${this.props.match.path}/${course.public_id}`);
  };

  render() {
    const { registeredCourses } = this.props;
    return (
      <div className="registered-courses-container">
        {Array.isArray(registeredCourses) && registeredCourses.length ? (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Course Code</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {registeredCourses.map(course => (
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
                      onClick={() => this.handleUnregister(course.public_id)}
                    >
                      Unregister
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <span className="no-registered-course">No Registered course!</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  mode: selectUserType(state),
  currentUser: selectCurrentUser(state),
  id: selectCurrentUser(state).public_id,
  registeredCourses: denormalizeObject(selectRegisteredCourses(state))
});

const mapDispatchToProps = dispatch => ({
  getRegisteredCourses: (mode, currentUser, isRegistered) =>
    dispatch(getCourses(mode, currentUser, (isRegistered = true))),
  getUnregisteredCourses: (mode, currentUser, isRegistered) =>
    dispatch(getCourses(mode, currentUser, (isRegistered = false))),
  setCourseView: course => dispatch(setCourseView(course))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisteredCourses));
