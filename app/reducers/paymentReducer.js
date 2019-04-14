import { CHANGE_PAYMENT_METHOD, TOGGLE_PAYMENT_MODAL } from "../actions/types";
import update from "immutability-helper";

const initialState = {
  method: "cash",
  modalStatus: false //hidden
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAYMENT_METHOD:
      return update(state, {
        method: {
          $set: action.payload
        }
      });
    case TOGGLE_PAYMENT_MODAL:
      return update(state, {
        modalStatus: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
}
