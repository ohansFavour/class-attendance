import signinTypes from "../sign-in/signinTypes";
import Axios from "axios";
import { store } from "react-notifications-component";

export const isFetchingUser = () => ({
  type: signinTypes.IS_FETCHING_USER
});

export const fetchingUserSuccess = (data, userType) => ({
  type: signinTypes.FETCH_USER_SUCCESS,
  payload: data,
  userType: userType
});

export const fetchingUserFailure = () => ({
  type: signinTypes.FETCH_USER_FAILURE
});

//thunk action

export const fetchUserAsync = data => {
  const { loginUrl, email, password, selectedOption } = data;
  return async dispatch => {
    const { error, response } = await Axios({
      method: "POST",
      url: loginUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email_address: email,
        password: password
      }
    })
      .then(response => ({ response }))
      .catch(error => ({ error }));
   
    if (response) {
      dispatch(isFetchingUser());
      const publicId = response.data.public_id;
      const fetchingUrl = `/${selectedOption}/${publicId}`;
      const { res, err } = await Axios({
        method: "GET",
        url: fetchingUrl,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => ({ res }))
        .catch(err => ({ err }));

      if (res) {
        dispatch(fetchingUserSuccess(res.data, selectedOption));

      }

      if (err) {
        const msg = err.response.data.message
          ? err.response.data.message
          : "Error logging in, please check your network connection";
        dispatch(fetchingUserFailure());
        store.addNotification({
          title: "Failure",
          message: msg,
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
    }
    

    if (error) {
      const message = error.response.data
        ? error.response.data.message
        : "Error logging in, please check your network connection";

      dispatch(fetchingUserFailure());

      store.addNotification({
        title: "Failure",
        message: message,
        width: 500,
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
