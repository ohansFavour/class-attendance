import React from "react";

import Logo from "../../accessories/oaulogo.jpg";

import "./lecturerPageHeader.css";

class LecturerPageHeader extends React.Component {

    
    render() {
      return (
        <div className="lecturer-page-header-container">
          <div className="lecturer-page-header-logo-container">
            <img src={Logo} className="lecturer-page-header-logo" />
          </div>
          <div className="lecturer-page-header-options">
            <div className="lecturer-page-header-option">Profile</div>
            <div className="lecturer-page-header-option">Courses</div>
          </div>
        </div>
      );
    }
  }

export default LecturerPageHeader