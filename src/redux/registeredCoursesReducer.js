import {
  ASYNC_REGISTERED_COURSES_START,
  ASYNC_REGISTERED_COURSES_SUCCESS,
  ASYNC_REGISTERED_COURSES_FAILURE,
  LOGOUT,
  ADD_COURSE_ATTENDANCE,
  attendanceTypes
} from "./types";

import {
  addToParticularEntryNormalizedObject,
  removeParticularEntryNormalizedObject
} from "../functions";

const INITIAL_STATE = {
  courses: null,
  isLoading: undefined,
  errorMessage: undefined
};

const registeredCoursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASYNC_REGISTERED_COURSES_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined,
        courses: null
      };

    case ASYNC_REGISTERED_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: false
      };
    case ASYNC_REGISTERED_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        courses: null,
        isLoading: undefined,
        errorMessage: undefined,
      };
    
    default:
      return state;
  }
};

export default registeredCoursesReducer;
