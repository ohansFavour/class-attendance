import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import SignUp from "./components/signUp/signUp";
import StudentPage from "./pages/studentPage/studentPage";
import LecturerPage from "./pages/lecturerPage/lecturerPage";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App-container">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/lecturerpage" component= {LecturerPage}/>
        <Route path="/studentpage" component={StudentPage} />
        
        {/* <Route path="/lecturerpage" component={Lecturer} /> */}
      </Switch>
    </div>
  );
}

export default App;
