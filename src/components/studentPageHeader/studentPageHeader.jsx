import React from "react";
import {connect} from "react-redux";

import {Link, withRouter} from "react-router-dom";

import {logout} from "../../redux/actions";
import {selectCurrentUserMode} from "../../redux/selectors";

import Logo from "../../accessories/oaulogo.jpg";

import "./studentPageHeader.css";

const StudentPageHeader = (props)=>(
    <div className="student-page-header-container">
      <div className= "student-page-header-logo-container">
         <img src={Logo} className="student-page-header-logo"/>
      </div>
      <div className="student-page-header-options">
       <Link to={`${props.match.path}`} className="student-page-header-option">Profile</Link>
       <Link to={`${props.match.path}/courses`} className="student-page-header-option">Courses</Link>
       <Link to={`/`} onClick={()=> props.logout(props.mode)} className="student-page-header-option">Logout</Link>
      </div>
    </div>
)
const mapStateToProps=()=>({
  mode: selectCurrentUserMode
})
const mapDispatchToProps = (dispatch,mode)=>({
  logout:()=> dispatch(logout(mode))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentPageHeader));