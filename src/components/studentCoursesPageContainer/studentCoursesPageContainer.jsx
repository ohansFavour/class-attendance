import React from "react";

import withSpinner from "../with-spinner/with-spinner.component";
import registeredCoursesComponent from "../registeredCourses/registeredCourses.component";

import "./studentCoursesPageContainer.css";


const enhancedRegisteredCourses = withSpinner(registeredCoursesComponent)
const StudentCoursesPageContainer=()=>(
    <div className="student-courses-page-container">
        
    </div>
)