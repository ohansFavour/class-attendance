import React from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Signin from "../signIn/signIn";
import HomepageHeader from "../homepage-header/homepage-header.component";

import "./homepage.component.css";

const HomePage = ()=>(

    <div className ="homepage-component-container">
      <HomepageHeader/>
      <div className="homepage-component-signin-container"><Signin/></div>
    </div>
);

export default HomePage;