import { SET_CURRENT_USER, SET_COURSE_VIEW, LOGOUT } from "./types";

const INITIAL_STATE = {
  currentUser: null,
  courseView: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        courseView: null
      };
    default:
      return state;
  }
};
export default userReducer;
