import * as types from "../actions/types";

import update from "immutability-helper";

const initialState = {
  cars: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CARS_LOADED:
      return update(state, {
        cars: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}
