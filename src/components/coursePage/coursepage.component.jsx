import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { selectCourse } from "../../redux/selectors";

import "./coursepage.styles.css";

class Course extends React.Component {

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { course } = this.props;
    return (
      <React.Fragment>
        <div className="course-view-container">
          <div className="course-view-main-content">
            <p className="course-view-main-content-heading">
              {`Course Title: ${course.course_title}`}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              {`Course Code: ${course.course_code}`}{" "}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              {`Faculty: ${course.faculty}`}{" "}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              {`Department: ${course.department}`}{" "}
            </p>
          </div>
          <div className="course-view-button-container">
          <button onClick={this.handleBack} className="course-view-courses-button">
              Attendance History
          </button>
        </div>
        </div>

        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  course: selectCourse(state)
});
export default connect(mapStateToProps)(withRouter(Course));
