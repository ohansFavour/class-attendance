import React from "react";
import {connect} from "react-redux";

import StudentProfile from "./studentProfile.component";
import { selectIsLoadingCurrentUser } from "../../redux/selectors";
import {withSpinner} from "../with-spinner/with-spinner.component";


const EnhancedStudentContainer = withSpinner(StudentProfile);
const StudentProfileContainer=(props)=>{
    return(
    <div>
        <EnhancedStudentContainer isLoading={!props.currentUser} {...props}/>
    </div>
)}

const mapStateToProps=state=>({
    currentUserIsLoading: selectIsLoadingCurrentUser(state)
})

export default connect(mapStateToProps)(StudentProfileContainer)