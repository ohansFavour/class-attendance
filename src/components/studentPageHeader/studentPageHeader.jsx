import React from "react";
import { connect } from "react-redux";

import { Link, withRouter , Redirect} from "react-router-dom";

import { logout } from "../../redux/actions";
import { selectCurrentUserMode } from "../../redux/selectors";

import Logo from "../../accessories/oaulogo.jpg";

import "./studentPageHeader.css";

class StudentPageHeader extends React.Component {

  handleLogout = async () => {
     await this.props.logout(this.props.mode);
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
  mode: selectCurrentUserMode(state)
});
const mapDispatchToProps = dispatch => ({
  logout: mode => dispatch(logout(mode))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StudentPageHeader));
