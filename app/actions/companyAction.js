import * as types from "./types";
import axios from "axios";

export function getCompanies() {
  return dispatch => {
    axios
      .get("companies")
      .then(res => {
        dispatch({
          type: types.COMPANIES_LOADED,
          payload: res.data
        });
      })
      .catch(err => console.log(err.request, err.response));
  };
}

export function getRoutes(park_id) {
  return dispatch => {
    axios
      .get(`routes/${park_id}`)
      .then(res => {
        dispatch({
          type: types.ROUTES_LOADED,
          payload: res.data
        });
      })
      .catch(err => console.log(err.request, err.response));
  };
}
