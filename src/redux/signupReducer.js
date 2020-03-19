import studentTypes from "./student/studentTypes";
import {RESET} from "./types";

const INITIAL_STATE = {
  isCreating:false,
  userCreated:false
};

const signupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
   case RESET:
       return {
           ...state,
           userCreated: false,
           isCreating: false
       }
   case studentTypes.CREATE_NEW_STUDENT_SUCCESS:
       return{
           ...state,
           userCreated: true,
           isCreating: false
       }
       case studentTypes.CREATE_NEW_STUDENT_START:
           return{
               ...state,
               isCreating:true,
               userCreated: false
           }
           case studentTypes.CREATE_NEW_STUDENT_FAILURE:
               return{
                   ...state,
                   isCreating:false,
                   userCreated:false
               }
    default:
      return state;
  }
};
export default signupReducer;
