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
              {`Name: ${course.course_title}`}
            </p>
            <p className="course-view-main-content-heading">
              {" "}
              {`Course code: ${course.course_code}`}{" "}
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
        </div>

        <div className="course-view-button-container">
          <button onClick={this.handleBack} className="course-view-courses-button">
              Back
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  course: selectCourse(state)
});
export default connect(mapStateToProps)(withRouter(Course));
