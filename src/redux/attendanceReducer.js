import { attendanceTypes, ADD_COURSE_ATTENDANCE } from "./types";
import { removeEntryFromObject } from "../functions";

const INITIAL_STATE = {
  isLoading: false
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_COURSE_ATTENDANCE:
      return {
        ...state,
        [action.courseId]: action.payload
      };
    case attendanceTypes.IS_LOADING_COMMITS:
      return {
        ...state,
        isLoading: true
      };
    case attendanceTypes.ATTENDANCE_COMMITS_SUCCESS:
        console.log(action.courseId)
      return {
        ...state,
        isLoading: false,
        [action.courseId]: {
          ...state[action.courseId],
          commits: action.payload
        }
      };
    case attendanceTypes.CLEAR_ATTENDANCE:
      const newState = removeEntryFromObject(state, action.payload);
      return {
        ...newState
      };
    case attendanceTypes.ATTENDANCE_COMMITS_FAILURE:
      return {
        ...state,
        isLoading: false,
        [action.courseId]: {
          ...state[action.courseId],
          commits: null
        }
      };
    default:
      return state;
  }
};

export default attendanceReducer;
