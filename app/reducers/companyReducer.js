import * as types from "../actions/types";

import update from "immutability-helper";

const initialState = {
  companies: [],
  routes: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COMPANIES_LOADED:
      return update(state, {
        companies: {
          $set: action.payload
        }
      });
    case types.ROUTES_LOADED:
      return update(state, {
        routes: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}
