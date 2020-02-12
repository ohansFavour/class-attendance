import React from "react";

import YourCourse from "../yourCourse/yourCourse";
import CreateCourse from "../createCourse/createCourse";

import "./lecturerCoursePage.css";

class LecturerCoursePage extends React.Component {
   
    constructor(props){
        super(props);
        this.state={
            display: 1
        }
    }

   render(){
    return(
        <div className="lecturer-course-page">
            <div className="column-one">
                <div className="lecturer-course-page-column1-item" onClick={()=>{
                    this.setState({
                        display: 1
                    })
                }}> Your Courses</div>
                <div className="lecturer-course-page-column1-item" onClick={()=>{
                    this.setState({
                        display: 2
                    })
                }}>Create New Course</div>
            </div>
            <div className="column-two">
            {this.state.display== 1?(<div>
              <YourCourse/>
            </div>):(<div>
                <CreateCourse/>
            </div>)}
            </div>
        </div>
    )
   }
    
}

export default LecturerCoursePage;