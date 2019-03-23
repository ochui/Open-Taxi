import * as types from "./types";
import axios from "axios";

export function getCars() {
  return dispatch => {
    axios
      .get("cars")
      .then(res => {
        dispatch({
          type: types.CARS_LOADED,
          payload: res.data
        });
      })
      .catch(err => console.log(err.request, err.response));
  };
}
