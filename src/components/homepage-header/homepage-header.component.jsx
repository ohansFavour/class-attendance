import React from "react";

import OauLogo from "../../accessories/oaulogo.jpg";

import "./homepage-header.component.css";

const HomepageHeader = () => (
  <div className="homepage-header">

    <div className="homepage-header-logo-container">
      {/* <img src={OauLogo} className="homepage-header-logo"/> */}
    </div>

    <div className="homepage-header-title"><span className="homepage-header-text"></span></div>

  </div>
);

export default HomepageHeader;
