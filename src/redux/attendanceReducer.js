import {
  attendanceTypes,
  ADD_COURSE_ATTENDANCE,
  commitedStudents
} from "./types";
import { removeEntryFromObject } from "../functions";

const INITIAL_STATE = {
  isLoading: false,
  loadingProfiles: false,
  attendanceProfiles: null
};

const attendanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commitedStudents.IS_LOADING_COMMITED_STUDENTS:
      let attendanceObject = state.attendanceProfiles[action.payload];
      attendanceObject.isLoading = true;
      return {
        ...state,
        attendanceProfiles: {
          ...state.attendanceProfiles,
          [action.payload]: attendanceObject
        }
      };

    case commitedStudents.COMMITED_STUDENTS_SUCCESS:
      let attendanceObject2 = state.attendanceProfiles[action.attendanceId];
      attendanceObject2.isLoading = false;
      attendanceObject2.commitedStudents = action.data;
      return {
        ...state,
        attendanceProfiles: {
          ...state.attendanceProfiles,
          [action.attendanceId]: attendanceObject2
        }
      };

    case commitedStudents.COMMITED_STUDENTS_FAILURE:
      let attendanceObject3 = state.attendanceProfiles[action.payload];
      attendanceObject3.isLoading = false;
      return {
        ...state,
        attendanceProfiles: {
          ...state.attendanceProfiles,
          [action.payload]: attendanceObject3
        }
      };

    case attendanceTypes.IS_LOADING_ATT_PROFILES:
      return {
        ...state,
        loadingProfiles: true,
        attendanceProfiles: null
      };

    case attendanceTypes.ATT_PROFILES_SUCCESS:
      return {
        ...state,
        loadingProfiles: false,
        attendanceProfiles: action.payload
      };

    case attendanceTypes.ATT_PROFILES_FAILURE:
      return {
        ...state,
        loadingProfiles: false
      };

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
      console.log(action.courseId);
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
