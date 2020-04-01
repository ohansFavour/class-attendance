import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { USER_LOGOUT } from "./types";
import user from "./userReducer";
import unregisteredCourses from "./unregisteredCoursesReducer";
import attendance from "./attendanceReducer";
import registeredCourses from "./registeredCoursesReducer";
import signup from "./signupReducer";

const persistConfig = {
  key: "root",
  storage
};

const appReducer = combineReducers({
  user,
  registeredCourses,
  unregisteredCourses,
  attendance,
  signup
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};
export default persistReducer(persistConfig, rootReducer);
