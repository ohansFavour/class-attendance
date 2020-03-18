import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';


import user from "./userReducer";
import unregisteredCourses from "./unregisteredCoursesReducer";
import attendance from "./attendanceReducer";
import registeredCourses from "./registeredCoursesReducer";
import signup from "./signupReducer";


const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer= combineReducers({
user,
registeredCourses,
unregisteredCourses,
attendance,
signup

});
export default persistReducer(persistConfig,rootReducer);