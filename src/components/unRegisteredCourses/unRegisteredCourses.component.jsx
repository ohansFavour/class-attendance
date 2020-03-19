import React from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import {
  selectCurrentUser,
  selectUnregisteredCourses,
  selectUserType
} from "../../redux/selectors";
import { setCourseView, getCourses } from "../../redux/actions";

import { denormalizeObject } from "../../functions";

import "./unRegisteredCourses.component.css";

class UnRegisteredCourses extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { mode, currentUser, getUnregisteredCourses } = this.props;
    getUnregisteredCourses(mode, currentUser, false);
  }
  handleRegister = async courseID => {
    const { mode, currentUser } = this.props;
    await Axios.put(`/course/${this.props.mode}/${this.props.id}`, {
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
    const { unregisteredCourses } = this.props;
    return (
      <div className="registered-courses-container">
        {Array.isArray(unregisteredCourses) && unregisteredCourses.length ? (
          <Table>
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Course Code</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {unregisteredCourses.map(course => (
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
                      onClick={() => this.handleRegister(course.public_id)}
                    >
                      register
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <span className="no-registered-course">No Unregistered course!</span>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  mode: selectUserType(state),
  id: selectCurrentUser(state).public_id,
  unregisteredCourses: denormalizeObject(selectUnregisteredCourses(state))
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
)(withRouter(UnRegisteredCourses));
