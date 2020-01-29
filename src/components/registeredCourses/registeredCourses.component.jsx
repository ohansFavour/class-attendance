import React from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/selectors";
import { getCourses, setCourseView } from "../../redux/actions";

import "./registeredCourses.component.css";

import { baseURL, proxyurl } from "../../constants";

class RegisteredCourses extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUnregister = async courseID => {
    console.log(courseID, this.props.id, this.props.mode);

    await Axios.delete(
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
    const { list, match } = this.props;
    return (
      <div className="registered-courses-container">
       {Array.isArray(list) && list.length ? (<table>
          <tr className="table-row-header">
            <th className="table-content-header">Course Title</th>
            <th className="table-content-header">Course Code</th>
            <th></th>
            <th></th>
          </tr>
          {list.map(course => (
            <tr  key={course.public_id} className="table-row">
              <td className="table-content-title"> {course.course_title}</td>
              <td className="table-content"> {course.course_code}</td>
              <td className="table-content">
                <button
                  onClick={() => this.handleView(course)}
                >
                  View
                </button>
              </td>
              <td className="table-content">
                <button
                  onClick={() => this.handleUnregister(course.public_id)}
                >
                  Unregister
                </button>
              </td>
            </tr>
          ))}
        </table>) : <span className="no-registered-course">No Registered course!</span>} 
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
)(withRouter(RegisteredCourses));
