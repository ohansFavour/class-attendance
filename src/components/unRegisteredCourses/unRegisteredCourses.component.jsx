import React from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/selectors";
import { setCourseView, getCourses } from "../../redux/actions";

import { baseURL, proxyurl } from "../../constants";

import "./unRegisteredCourses.component.css";

class UnRegisteredCourses extends React.Component {
  constructor(props) {
    super(props);
  }
  handleRegister = async courseID => {
    await Axios.put(
      `${proxyurl + baseURL}/course/${this.props.mode}/${this.props.id}`,
      {
        public_id: courseID
      }
    ).then(() => {
      this.props.getUnregisteredCourses(this.props.currentUser);
      this.props.getRegisteredCourses(this.props.currentUser);
    });
  };
  handleView = course => {
    this.props.setCourseView(course);
    this.props.history.push(`${this.props.match.path}/${course.public_id}`);
  };
  render() {
    const { list } = this.props;
    return (
      <div className="registered-courses-container">
        {Array.isArray(list) && list.length ? (
          <table>
            <tr className="table-row-header">
              <th className="table-content-header">Course Title</th>
              <th className="table-content-header">Course Code</th>
              <th></th>
              <th></th>
            </tr>
            {list.map(course => (
              <tr key={course.public_id} className="table-row">
                <td className="table-content-title"> {course.course_title}</td>
                <td className="table-content"> {course.course_code}</td>
                <td className="table-content">
                  <button onClick={() => this.handleView(course)}>View</button>
                </td>
                <td className="table-content">
                  <button onClick={() => this.handleRegister(course.public_id)}>
                    register
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <span className="no-registered-course">No Unregistered course!</span>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  mode: selectCurrentUser(state).mode,
  id: selectCurrentUser(state).public_id
});

const mapDispatchToProps = dispatch => ({
  getRegisteredCourses: (currentUser, isRegistered) =>
    dispatch(getCourses(currentUser, (isRegistered = true))),
  getUnregisteredCourses: (currentUser, isRegistered) =>
    dispatch(getCourses(currentUser, (isRegistered = false))),
  setCourseView: course => dispatch(setCourseView(course))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UnRegisteredCourses));
