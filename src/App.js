import React from 'react';
import {Switch,Route} from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import SignUp from "./components/signUp/signUp";
import StudentPage from "./pages/studentPage/studentPage";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './App.css';



function App() {
  return (
    <div className="App-container">
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route  path="/signup" component ={SignUp}/>
        <Route path ="/studentpage" component={StudentPage}/>
      </Switch>
    </div>
  );
}

export default App;
