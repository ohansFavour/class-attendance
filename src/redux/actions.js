import Axios from "axios";

import {
  SET_CURRENT_USER,
  ASYNC_UNREGISTERED_COURSES_START,
  ASYNC_UNREGISTERED_COURSES_SUCCESS,
  ASYNC_UNREGISTERED_COURSES_FAILURE,
  ASYNC_REGISTERED_COURSES_START,
  ASYNC_REGISTERED_COURSES_SUCCESS,
  ASYNC_REGISTERED_COURSES_FAILURE,
  SET_COURSE_VIEW,
  LOGOUT
} from "./types";

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const baseURL =
  "http://testenv-barebone-flask-rest-api.vpyckwffts.eu-central-1.elasticbeanstalk.com";

export const setCurrentUser = currentUser => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
};

export const asyncRegisteredCoursesStart = () => ({
  type: ASYNC_REGISTERED_COURSES_START
});

export const asyncRegisteredCoursesFailure = errorMessage => ({
  type: ASYNC_REGISTERED_COURSES_FAILURE,
  payload: errorMessage
});

export const asyncRegisteredCoursesSuccess = data => ({
  type: ASYNC_REGISTERED_COURSES_SUCCESS,
  payload: data
});

export const asyncUnregisteredCoursesStart = () => ({
  type: ASYNC_UNREGISTERED_COURSES_START
});

export const asyncUnregisteredCoursesFailure = errorMessage => ({
  type: ASYNC_UNREGISTERED_COURSES_FAILURE,
  payload: errorMessage
});

export const asyncUnregisteredCoursesSuccess = data => ({
  type: ASYNC_UNREGISTERED_COURSES_SUCCESS,
  payload: data
});

export const setCourseView = course=>({
    type: SET_COURSE_VIEW,
    payload: course
})

export const logout = (mode)=>{
   Axios.post(`${proxyurl +baseURL}/auth/${mode}/logout`)
   return{
     type: LOGOUT
   }
}

export const getCourses = (currentUser, isRegistered) => {
  const { mode, public_id } = currentUser;

  if (isRegistered) {
    return dispatch => {
      dispatch(asyncRegisteredCoursesStart());

      Axios.post(`${proxyurl + baseURL}/course/${mode}/${public_id}`, {
        registered: isRegistered
      })
        .then(response => {
          dispatch(asyncRegisteredCoursesSuccess(response.data));
        })
        .catch(error => {
          dispatch(asyncRegisteredCoursesFailure(error.message));
        });
    };
  }

  if (!isRegistered) {
    return dispatch => {
      dispatch(asyncUnregisteredCoursesStart());

      Axios.post(`${proxyurl + baseURL}/course/${mode}/${public_id}`, {
        registered: isRegistered
      })
        .then(response => {
          dispatch(asyncUnregisteredCoursesSuccess(response.data));
        })
        .catch(error => {
          dispatch(asyncUnregisteredCoursesFailure(error.message));
        });
    };
  }
};

