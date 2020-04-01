import Axios from "axios";
import { store } from "react-notifications-component";
import {
  SET_CURRENT_USER,
  ASYNC_UNREGISTERED_COURSES_START,
  ASYNC_UNREGISTERED_COURSES_SUCCESS,
  ASYNC_UNREGISTERED_COURSES_FAILURE,
  ASYNC_REGISTERED_COURSES_START,
  ASYNC_REGISTERED_COURSES_SUCCESS,
  ASYNC_REGISTERED_COURSES_FAILURE,
  SET_COURSE_VIEW,
  ADD_COURSE_ATTENDANCE,
  USER_LOGOUT,
  attendanceTypes,
  commitedStudents
} from "./types";

import { normalizeArray } from "../functions";

export const isLoadingCommitedStudents = attendanceId => ({
  type: commitedStudents.IS_LOADING_COMMITED_STUDENTS,
  payload: attendanceId
});

export const commitedStudentsFailure = attendanceId => ({
  type: commitedStudents.COMMITED_STUDENTS_FAILURE,
  payload: attendanceId
});

export const commitedStudentsSuccess = (attendanceId, data) => ({
  type: commitedStudents.COMMITED_STUDENTS_SUCCESS,
  attendanceId,
  data
});
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

export const setCourseView = course => ({
  type: SET_COURSE_VIEW,
  payload: course
});

export const logoutAction = () => ({
  type: USER_LOGOUT
});

export const addCourseAttendance = (data, courseId) => ({
  type: ADD_COURSE_ATTENDANCE,
  payload: data,
  courseId: courseId
});

export const isLoadingAttendance = () => ({
  type: attendanceTypes.IS_LOADING_ATTENDANCE
});

export const attendanceProfileSuccess = data => ({
  type: attendanceTypes.ATTENDANCE_PROFILE_SUCCESS,
  payload: data
});

export const attendanceProfileFailure = () => ({
  type: attendanceTypes.ATTENDANCE_PROFILE_FAILURE
});

export const isLoadingCommit = () => ({
  type: attendanceTypes.IS_LOADING_COMMITS
});

export const commitSuccess = (data, courseId) => ({
  type: attendanceTypes.ATTENDANCE_COMMITS_SUCCESS,
  payload: data,
  courseId: courseId
});

export const commitFailure = courseId => ({
  type: attendanceTypes.ATTENDANCE_COMMITS_FAILURE,
  courseId: courseId
});

export const clearAttendance = courseId => ({
  type: attendanceTypes.CLEAR_ATTENDANCE,
  payload: courseId
});

export const isLoadingAttendanceProfiles = () => ({
  type: attendanceTypes.IS_LOADING_ATT_PROFILES
});

export const attendanceProfilesSuccess = data => ({
  type: attendanceTypes.ATT_PROFILES_SUCCESS,
  payload: normalizeArray(data)
});

export const attendanceProfilesFailure = () => ({
  type: attendanceTypes.ATT_PROFILES_FAILURE
});

export const addCourseToUser = (mode, userPublicId, response) => {
  return async dispatch => {
    await Axios.put(`/course/${mode}/${userPublicId}`, {
      public_id: response.data.public_id
    })
      .then(response => {
        store.addNotification({
          title: "Success",
          message: "Course successfully created",
          width: 400,
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      })
      .catch(error => {
        const message = "An error occured while creating course";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 400,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };
};

export const createAndAddCourse = (createObject, mode, userPublicId) => {
  const {
    faculty,
    course_title,
    course_code,
    department,
    strict
  } = createObject;

  return async dispatch => {
    await Axios.post(`/course/`, {
      faculty: faculty.value,
      department: department,
      course_title: course_title,
      course_code: course_code,
      strict: strict ? true : false
    })
      .then(async response => {
        await dispatch(addCourseToUser(mode, userPublicId, response));
      })
      .catch(error => {
        const message = error.response.data.message
          ? error.response.data.message
          : "An error occured while creating course";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 400,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };
};

export const getCourses = (mode, currentUser, isRegistered) => {
  const { public_id } = currentUser;

  if (!isRegistered) {
    return async dispatch => {
      dispatch(asyncUnregisteredCoursesStart());
      console.log("yhhhhh", public_id);
      const url = `/course/${mode}/${public_id}`;

      await Axios({
        method: "POST",
        url: url,
        data: {
          registered: false
        }
      })
        .then(async response => {
          await dispatch(
            asyncUnregisteredCoursesSuccess(normalizeArray(response.data))
          );
        })
        .catch(async error => {
          const message = error.response.data.message
            ? error.response.data.message
            : "Error loading courses!";
          await dispatch(asyncUnregisteredCoursesFailure(message));
        });
    };
  }
  if (isRegistered) {
    return async dispatch => {
      dispatch(asyncRegisteredCoursesStart());

      await Axios.post(`/course/${mode}/${public_id}`, {
        registered: isRegistered
      })
        .then(async response => {
          await dispatch(
            asyncRegisteredCoursesSuccess(normalizeArray(response.data))
          );
        })
        .catch(async error => {
          const message = error.response.data.message
            ? error.response.data.message
            : "Error loading courses!";
          await dispatch(asyncRegisteredCoursesFailure(message));
        });
    };
  }
};

export const setCommit = (attendanceId, courseId) => {
  return async dispatch => {
    dispatch(isLoadingCommit());
    await Axios.get(`/attendance/student/${attendanceId}`)
      .then(response => {
        dispatch(commitSuccess(response.data, courseId));
      })
      .catch(error => {
        dispatch(commitFailure(courseId));
        const message = error.response.data.message
          ? error.response.data.message
          : "An error occured while getting attendance";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 400,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };
};

export const setAttendanceProfile = attendanceId => {
  return async dispatch => {
    dispatch(isLoadingAttendance());
    await Axios.get(`/attendance/profile/${attendanceId}`)
      .then(async response => {
        await dispatch(attendanceProfileSuccess(response.data));
        await dispatch(setCommit(attendanceId));
      })
      .catch(error => {
        dispatch(attendanceProfileFailure());
        const message = error.response.data.message
          ? error.response.data.message
          : "An error occured while getting attendance";
        store.addNotification({
          title: "Error!",
          message: message,
          width: 400,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };
};
