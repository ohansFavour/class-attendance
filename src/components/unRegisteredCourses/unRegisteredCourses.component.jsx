import React from "react";
import Axios from "axios";
import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/selectors";
import { getCourses } from "../../redux/actions";

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
  render() {
    const { list } = this.props;
    return (
      <div className="unregistered-courses-container">
        {list.map(course => (
          <div className="each-course-unregistered" key={course.public_id}>
            <div className="each-course-name-unregistered">
              {" "}
              {course.course_title}
            </div>
            <div className="each-course-name-unregistered">
              {" "}
              {course.course_code}
            </div>
            <button
              className="each-course-button-unregistered"
              onClick={() => this.handleRegister(course.public_id)}
            >
              Register
            </button>
          </div>
        ))}
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
    dispatch(getCourses(currentUser, (isRegistered = false)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnRegisteredCourses);
