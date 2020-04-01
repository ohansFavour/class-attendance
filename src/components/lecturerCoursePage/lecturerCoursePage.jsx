import React from "react";

import YourCourse from "../yourCourse/yourCourse";
import CreateCourse from "../createCourse/createCourse";
import LecturerUnregistered from "../lecturerUnregistered/lecturerUnregistered";

import "./lecturerCoursePage.css";

class LecturerCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 1
    };
  }

  render() {
    const { display } = this.state;
    return (
      <div className="lecturer-course-page">
        <div className="column-one-lecturerCourse">
          <div
            className={`lecturer-course-page-column1-item  ${
              display == 1 ? "purple-color" : ""
            }`}
            onClick={() => {
              this.setState({
                display: 1
              });
            }}
          >
            {" "}
            Your Courses
          </div>

          <div
            className={`lecturer-course-page-column1-item  ${
              display == 2 ? "purple-color" : ""
            }`}
            onClick={() => {
              this.setState({
                display: 2
              });
            }}
          >
            Unregistered Courses
          </div>

          <div
            className={`lecturer-course-page-column1-item  ${
              display == 3 ? "purple-color" : ""
            }`}
            onClick={() => {
              this.setState({
                display: 3
              });
            }}
          >
            Create New Course
          </div>
        </div>
        <div className="column-two-lecturerCourse">
          {this.state.display == 1 ? (
            <React.Fragment>
              <div className="lecturer-course-page-your-course-header">
                <h3>Your Courses</h3>
              </div>
              <YourCourse />
            </React.Fragment>
          ) : null}
          {this.state.display == 2 ? (
            <div>
              <h3 className="lecturer-course-page-your-course-header" >Unregistered Courses</h3>
              <LecturerUnregistered />
            </div>
          ) : null}
          {this.state.display == 3 ? (
            <div>
              <CreateCourse />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default LecturerCoursePage;
