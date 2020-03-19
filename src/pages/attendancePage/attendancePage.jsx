import React from "react";

import MarkAttendance from "../../components/markAttendance/markAttendance";
import "./attendancePage.css";
import CheckAttendance from "../../components/markAttendance/check-attendance";

class AttendancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 1
    };
  }

  render() {
    const { display } = this.state;
    return (
      <div className="attendance-page">
        <div className="column-one">
          <div
            className={`attendance-page-column1-item  ${
              display == 1 ? "purple-color" : ""
            }`}
            onClick={() => {
              this.setState({
                display: 1
              });
            }}
          >
            {" "}
            Mark Attendance
          </div>

          <div
            className={`attendance-page-column1-item  ${
              display == 2 ? "purple-color" : ""
            }`}
            onClick={() => {
              this.setState({
                display: 2
              });
            }}
          >
            Check Attendance Session
          </div>
        </div>
        <div className="column-two">
          {this.state.display == 1 ? (
            <React.Fragment>
              <div className="attendance-page-your-course-header">
                <h1 className="head-attend">Mark Attendance</h1>
              </div>
              <div className="mark-attendance">
                <MarkAttendance />
              </div>
            </React.Fragment>
          ) : null}
          {this.state.display == 2 ? (
            <div>
              <div className="head-attend">
                <h1 className="attendance-page-your-course-header" >
                  Check Attendance Session
                </h1>
              </div>
              <div className="mark-attendance">
                <CheckAttendance />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default AttendancePage;
