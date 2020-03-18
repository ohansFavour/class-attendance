import Axios from "axios";

import { store } from "react-notifications-component";
import studentTypes from "./studentTypes";
import { RESET } from "../types";

//reset userCreated

export const reset = () => ({
  type: RESET
});
//Creating a new user
export const createNewStudentStart = () => ({
  type: studentTypes.CREATE_NEW_STUDENT_START
});

export const createNewStudentFailure = () => ({
  type: studentTypes.CREATE_NEW_STUDENT_FAILURE
});
export const createNewStudentSuccess = data => ({
  type: studentTypes.CREATE_NEW_STUDENT_SUCCESS,
  payload: data
});

export const createNewStudentAsync = data => {
  return async dispatch => {
    dispatch(createNewStudentStart());

    const { error, response } = await Axios({
      method: "POST",
      url: data.url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        ...data.details
      }
    })
      .then(response => ({ response }))
      .catch(error => ({ error }));

    if (response) {
      dispatch(createNewStudentSuccess());
      store.addNotification({
        title: "Success!",
        message: response.data.message,
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
    } else if (error.response.data.message) {
      dispatch(createNewStudentFailure());
      store.addNotification({
        title: "Error!",
        message: error.response.data.message,
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
    } else {
      dispatch(createNewStudentFailure());
      store.addNotification({
        title: "Error!",
        message: `error connecting to server, please check your network connection`,
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
    }
  };
};
