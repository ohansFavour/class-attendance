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
    console.log(courseID, this.props.id);

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

  handleView= (course)=>{
    console.log(course)
      this.props.setCourseView(course);
      this.props.history.push(`${this.props.match.path}/${course.public_id}`);
  }

  render() {
    const { list, match } = this.props;
    return (
      <div className="registered-courses-container">
        {list.map(course => (
          <div className="each-course" key={course.public_id}>
            <div className="each-course-name"> {course.course_title}</div>
            <div className="each-course-name"> {course.course_code}</div>
            <button className="each-course-button" onClick={()=>this.handleView(course)}>View</button>
            <button
              className="each-course-button"
              onClick={() => this.handleUnregister(course.public_id)}
            >
              Unregister
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
    dispatch(getCourses(currentUser, (isRegistered = false))),
    setCourseView: (course)=> dispatch(setCourseView(course))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisteredCourses));
