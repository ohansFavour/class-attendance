import React from "react";

import "./viewCourse.component.css";

const ViewCourse = ({course})=>{
    return(
        <div className="view-course-container">
           <h3>{course.course_title}</h3> 
           <div className="view-course-content">
               {/* list other ppts */}
           </div>
        </div>
    )
};

export default ViewCourse;