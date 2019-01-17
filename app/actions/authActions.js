import {
  PROFILE_LOADED,
  TOKEN_REQUEST,
  TOKEN_RECIEVE,
  TOKEN_REQUSET_ERROR,
  CLEAR_TOKEN,
  TOKEN_IS_PRESENT,
  EDIT_LOADER
} from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";

export function login(data) {
  return dispatch => {
    console.log(data);
    axios
      .post("auth/token/login/", data)
      .then(res => {
        console.log(res);
        dispatch({
          type: TOKEN_RECIEVE,
          payload: res.data.auth_token
        });
      })
      .catch(error => {
        dispatch({
          type: TOKEN_REQUSET_ERROR,
          payload: error.response ? error.response : error.request
        });
      });
  };
}

export function register(data) {
  console.log(data);
  return dispatch => {
    axios
      .post("auth/users/create", data)
      .then(res => {
        //Log in user. REST is bad sometimes
        axios
          .post("auth/token/login/", {
            username: data.username,
            password: data.password
          })
          .then(res => {
            dispatch({
              type: TOKEN_RECIEVE,
              payload: res.data.auth_token
            });
          })
          .catch(error => {
            dispatch({
              type: TOKEN_REQUSET_ERROR,
              payload: error
            });
          });
      })
      .catch(error => {
        dispatch({
          type: TOKEN_REQUSET_ERROR,
          payload: error
        });
      });
  };
}

export function tokenRequest() {
  return dispatch => {
    dispatch({
      type: TOKEN_REQUEST
    });
  };
}

export function clearToken() {
  return dispatch => {
    axios
      .post("auth/token/logout")
      .then(res => {
        console.log(res);
        AsyncStorage.removeItem("authToken").then(() => {
          dispatch({
            type: CLEAR_TOKEN,
            payload: res
          });
        });
      })
      .catch(err => console.log(err));
  };
}

export function checkToken() {
  return dispatch => {
    AsyncStorage.getItem("authToken").then(val => {
      dispatch({
        type: TOKEN_IS_PRESENT,
        payload: val ? true : false
      });
    });
  };
}

export function getProfile() {
  console.log("pro-----------")
  return dispatch => {
    axios
      .get("auth/me")
      .then(res => {
        dispatch({
          type: PROFILE_LOADED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
}

export function editProfile(data) {
  return dispatch => {
    axios
      .put("auth/me", data)
      .then(res => {
        dispatch({
          type: PROFILE_LOADED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
}

export function enableProfileLoader() {
  return dispatch => {
    dispatch({
      type: EDIT_LOADER
    });
  };
}
