import { SET_CURRENT_USER, SET_COURSE_VIEW, LOGOUT } from "./types";
import signinTypes from "./sign-in/signinTypes";

const INITIAL_STATE = {
  currentUser: null,
  courseView: null,
  isFetching: false,
  doneFetching: false,
  userType: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case signinTypes.IS_FETCHING_USER:
      return {
        ...state,
        isFetching: true,
        doneFetching: false
      };
    case signinTypes.FETCH_USER_SUCCESS:
      return {
        isFetching: false,
        currentUser: action.payload,
        doneFetching: true,
        userType: action.userType
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_COURSE_VIEW:
      return {
        ...state,
        courseView: action.payload
      };
    case LOGOUT:
      return {
        currentUser: null,
        courseView: null,
        isFetching: false,
        doneFetching: false,
        userType: null
      };
    default:
      return state;
  }
};
export default userReducer;
