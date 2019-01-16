import { CHANGE_PAYMENT_METHOD, TOGGLE_PAYMENT_MODAL } from "./types";

export function changePaymentMethod(method) {
  return dispatch => {
    dispatch({
      type: CHANGE_PAYMENT_METHOD,
      payload: method
    });
  };
}

export function togglePaymentModal(state) {
  return dispatch => {
    dispatch({
      type: TOGGLE_PAYMENT_MODAL,
      payload: !state
    });
  };
}
