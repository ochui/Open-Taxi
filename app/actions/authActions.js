import {
  PROFILE_LOADED,
  TOKEN_REQUEST,
  TOKEN_RECIEVE,
  TOKEN_REQUSET_ERROR,
  CLEAR_TOKEN,
  TOKEN_IS_PRESENT,
  EDIT_LOADER,
  HIDE_BVN_ERROR_DIALOG,
  HIDE_BVN_SUCCESS_DIALOG,
  ENABLE_VERIFICATION_SPINNER,
  DISABLE_VERIFICATION_SPINNER,
  BVN_VERIFICATION_FAILED,
  BVN_VERIFICATION_SUCCESSFULL
} from "./types";
import axios from "axios";
import { AsyncStorage } from "react-native";
import * as c from "../constants";

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
    // axios
    //   .post("auth/token/logout")
    //   .then(res => {
    //     console.log(res);
    //     AsyncStorage.removeItem("authToken").then(() => {
    dispatch({
      type: CLEAR_TOKEN
      //payload: res
    });
    //   });
    // })
    // .catch(err => console.log(err));
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

export const hideVerifiedDialod = status => {
  return dispatch => {
    dispatch({
      type: HIDE_BVN_SUCCESS_DIALOG,
      payload: !status
    });
  };
};

export const hideUnverifiedDialod = status => {
  return dispatch => {
    dispatch({
      type: HIDE_BVN_ERROR_DIALOG,
      payload: !status
    });
  };
};

export const bvnVerification = bvn => {
  return async (dispatch, store) => {
    user = store().auth.userData;

    dispatch({
      type: ENABLE_VERIFICATION_SPINNER
    });

    //verify user identity using BVN
    try {
      const bvn_res = await axios.get(
        c.FLUTTERWAVE_BVN_API_ENDPOINT +
          "/" +
          bvn +
          "?seckey=" +
          "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X"
      );
      console.log(bvn_res);
      if (
        bvn_res.data.firstname === user.first_name &&
        bvn_res.data.lastname === user.last_name &&
        bvn_res.data.phone_number === user.phone_number
      ) {
        if ((user.bvn == null || user.bvn == "null") && user.bvn != bvn) {
          //persist BVN to database
          try {
            await axios.patch("auth/me", { bvn: bvn });
          } catch (error) {
            //Remove Loading Overlay(Activity Indicator)
            dispatch({
              type: DISABLE_VERIFICATION_SPINNER
            });

            dispatch({
              type: BVN_VERIFICATION_FAILED
            });
          }
        }

        dispatch({
          type: BVN_VERIFICATION_SUCCESSFULL
        });
        //Remove Loading Overlay(Activity Indicator)
        dispatch({
          type: DISABLE_VERIFICATION_SPINNER
        });
      } else {
        console.log("fail");
        dispatch({
          type: BVN_VERIFICATION_FAILED
        });
        //Remove Loading Overlay(Activity Indicator)
        dispatch({
          type: DISABLE_VERIFICATION_SPINNER
        });
      }
    } catch (error) {
      //Remove Loading Overlay(Activity Indicator)
      dispatch({
        type: DISABLE_VERIFICATION_SPINNER
      });

      dispatch({
        type: BVN_VERIFICATION_FAILED
      });
    }
  };
};
