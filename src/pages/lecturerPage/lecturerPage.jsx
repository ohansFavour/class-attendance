import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import LecturerPageHeader from "../../components/lecturerPageHeader/lecturerPageHeader.component";
import LecturerProfile from "../../components/lecturerProfile/lecturerProfile.component";
import LecturerCoursePage from "../../components/lecturerCoursePage/lecturerCoursePage";
import LecturerCourse from "../../components/coursePageLecturer/coursePageLecturer";
import LecturerCourseAttendance from "../../components/lecturerCourseAttendance/lecturerCourseAttendance";
import AttendancePage from "../attendancePage/attendancePage";
import AttendanceHistory from "../../components/attendanceHistory/attendanceHistory";

import "./lecturerPage.css";

const LecturerPage = props => {
  return (
    <React.Fragment>
      <LecturerPageHeader />
      <Switch>
        <Route exact path={`${props.match.path}`} component={LecturerProfile} />
        <Route
          exact
          path={`${props.match.path}/courses`}
          component={LecturerCoursePage}
        />
        <Route
          exact
          path={`${props.match.path}/attendance`}
          render={props => (
            <AttendancePage {...props}  />
          )}
        />
        <Route
          exact
          path={`${props.match.path}/courses/:id`}
          component={LecturerCourse}
        />
        <Route
          exact
          path={`${props.match.path}/courses/:id/attendance`}
          component={LecturerCourseAttendance}
        />
        <Route
          exact
          path={`${props.match.path}/courses/:id/attendance-history`}
          component={AttendanceHistory}
        />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(LecturerPage);
