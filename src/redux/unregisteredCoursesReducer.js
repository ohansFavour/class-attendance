import {
  ASYNC_UNREGISTERED_COURSES_START,
  ASYNC_UNREGISTERED_COURSES_SUCCESS,
  ASYNC_UNREGISTERED_COURSES_FAILURE,
  LOGOUT,
  ADD_COURSE_ATTENDANCE
} from "./types";

import { addToParticularEntryNormalizedObject } from "../functions";

const INITIAL_STATE = {
  courses: null,
  isLoading: undefined,
  errorMessage: undefined
};

const unregisteredCoursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ASYNC_UNREGISTERED_COURSES_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: undefined
      };

    case ASYNC_UNREGISTERED_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
        errorMessage: undefined
      };
    case ASYNC_UNREGISTERED_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        courses: null
      };
    case LOGOUT:
      return {
        courses: null,
        isLoading: undefined,
        errorMessage: undefined
      };

    case ADD_COURSE_ATTENDANCE:
      const newCourse = addToParticularEntryNormalizedObject(
        state,
        action.courseId,
        action.payload,
        "attendance"
      );
      return {
        ...state,
        ...newCourse
      };

    default:
      return state;
  }
};

export default unregisteredCoursesReducer;
