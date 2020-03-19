import React from "react";
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import Logo from "../../accessories/oau.png";
import {logoutAction} from "../../redux/actions";

import "./lecturerPageHeader.css";

class LecturerPageHeader extends React.Component {

  handleLogout = ()=>{
   //logout
    this.props.logout();
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="lecturer-page-header-container">
        <div className="lecturer-page-header-logo-container">
          <img src={Logo} className="lecturer-page-header-logo" />
        </div>
        <div className="lecturer-page-header-options">
          <Link to={`${this.props.match.path}`} className="lecturer-page-header-option">Profile</Link>
          <Link to={`${this.props.match.path}/courses`} className="lecturer-page-header-option">Courses</Link>
          <div className="lecturer-page-header-option" onClick={this.handleLogout}>Logout</div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});
export default connect(null, mapDispatchToProps)(withRouter(LecturerPageHeader));
