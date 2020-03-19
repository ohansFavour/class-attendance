import React from "react";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import { logoutAction } from "../../redux/actions";
import { selectUserType } from "../../redux/selectors";

import Logo from "../../accessories/oau.png";

import "./studentPageHeader.css";

class StudentPageHeader extends React.Component {

  handleLogout = async () => {
     await this.props.logout();
     this.props.history.push("/");
  };
  render() {
    return (
      <div className="student-page-header-container">
        <div className="student-page-header-logo-container">
          <img src={Logo} className="student-page-header-logo" />
        </div>
        <div className="student-page-header-options">
          <Link
            to={`${this.props.match.path}`}
            className="student-page-header-option"
          >
            Profile
          </Link>
          <Link
            to={`${this.props.match.path}/courses`}
            className="student-page-header-option"
          >
            Courses
          </Link>
          <Link
            to={`${this.props.match.path}/attendance`}
            className="student-page-header-option"
          >
            Attendance
          </Link>
          <div
            
            onClick={this.handleLogout}
            className="student-page-header-option-logout"
          >
            Logout
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mode: selectUserType(state)
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentPageHeader));
