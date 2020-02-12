import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/selectors";

import LecturerPageHeader from "../../components/lecturerPageHeader/lecturerPageHeader.component";
import LecturerProfile from "../../components/lecturerProfile/lecturerProfile.component";
import LecturerCoursePage from "../../components/lecturerCoursePage/lecturerCoursePage";

import "./lecturerPage.css";



const LecturerPage = props => {
  return(<React.Fragment>
    <LecturerPageHeader/>
    <Switch>
      <Route exact path={`${props.match.path}`} component={LecturerProfile}/>
      <Route exact path={`${props.match.path}/courses`} component={LecturerCoursePage}/>
    </Switch>
  </React.Fragment>)
}

export default withRouter(LecturerPage)
