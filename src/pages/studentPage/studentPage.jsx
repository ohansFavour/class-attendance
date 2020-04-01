import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";

import StudentPageHeader from "../../components/studentPageHeader/studentPageHeader";
import StudentProfileContainer from "../../components/studentProfile/studentProfileContainer.component";
import StudentCoursesPage from "../../components/studentCoursesPage/studentCoursesPage.component";
import CoursePage from "../../components/coursePage/coursepage.component";


import "./studentPage.css";

const StudentPage = props => {
  const { currentUser } = props;
  return (
    <div className="student-page-container">
      <StudentPageHeader />
      <Switch>
        <Route
          exact
          path={props.match.path}
          render={props => (
            <StudentProfileContainer {...props} currentUser={currentUser} />
          )}
        />
        <Route
          exact
          path={`${props.match.path}/courses`}
          render={props => (
            <StudentCoursesPage {...props} currentUser={currentUser} />
          )}
        />
        <Route
          exact
          path={`${props.match.path}/courses/:courseID`}
          render={props => <CoursePage {...props} currentUser={currentUser} />}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
});
export default connect(mapStateToProps)(StudentPage);
