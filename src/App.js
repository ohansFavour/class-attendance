import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import SignUp from "./components/signUp/signUp";
import StudentPage from "./pages/studentPage/studentPage";
import LecturerPage from "./pages/lecturerPage/lecturerPage";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <div className="App-container">
      <ReactNotification />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/lecturerpage" component= {LecturerPage}/>
        <Route path="/studentpage" component={StudentPage} />
      </Switch>
    </div>
  );
}

export default App;
