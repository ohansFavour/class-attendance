import {
  ASYNC_UNREGISTERED_COURSES_START,
  ASYNC_UNREGISTERED_COURSES_SUCCESS,
  ASYNC_UNREGISTERED_COURSES_FAILURE,
  LOGOUT
} from "./types";

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
        isFetching: true
      };

    case ASYNC_UNREGISTERED_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: false
      };
    case ASYNC_UNREGISTERED_COURSES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      };
    case LOGOUT:
      return {
        courses: null,
        isLoading: undefined,
        errorMessage: undefined
      };

    default:
      return state;
  }
};

export default unregisteredCoursesReducer;
