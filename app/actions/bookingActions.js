import axios from "axios";

import {
  ADD_BOOKING_ERROR,
  ADD_BOOKING_SUCCESS,
  GET_ACTIVE_BOOKINGS,
  TOGGLE_BOOKING_MODAL,
  TOGGLE_WAITING_MODAL,
  CHANGE_PAYMENT_METHOD,
  TOGGLE_PAYMENT_MODAL,
  ADD_BOOKING_WITH_PAYMENT,
  LOADING,
  CLOADING,
  CANCEL_BOOKING
} from "./types";

export function addBooking(paymentData = {}) {
  //Show loading indicator and disable button
  return (dispacth, store) => {
    if (
      store().location.selectedAddress.pickUp &&
      store().location.selectedAddress.dropOff
    ) {
      let _address = {
        pickUp: store().location.selectedAddress.pickUp,
        dropOff: store().location.selectedAddress.dropOff
      };

      axios
        .post("booking", {
          address: _address
        })
        .then(res => {
          if (store().booking.paymentMethod == "cash") {
            dispacth({
              type: ADD_BOOKING_SUCCESS,
              payload: res.data
            });
          } else {
            dispacth({
              type: ADD_BOOKING_WITH_PAYMENT,
              payload: res.data
            });
          }
        })
        .catch(err => {
          dispacth({
            type: ADD_BOOKING_ERROR,
            payload: err
          });
        });
    }
  };
}

export function getActiveBookings() {
  return dispacth => {
    axios
      .get("booking")
      .then(res => {
        dispacth({
          type: GET_ACTIVE_BOOKINGS,
          payload: res.data.map(r => {
            return {
              time: "09:00",
              title: r.booking_time,
              description:
                "Pick UP:" +
                r.address.pickUp.structured_formatting.main_text +
                "\nDrop Off:" +
                r.address.dropOff.structured_formatting.main_text +
                "\nBilling Status:" +
                r.billing_status
            };
          })
        });
      })
      .catch(err => console.log(err));
  };
}

export function toggleBookingModal(status) {
  return dispacth => {
    dispacth({
      type: TOGGLE_BOOKING_MODAL,
      payload: !status
    });
  };
}

export function toggleWaitingModal(status) {
  return dispacth => {
    dispacth({
      type: TOGGLE_WAITING_MODAL,
      payload: !status
    });
  };
}

export function addBookingPayment() {
  return (dispacth, store) => {
    if (
      store().location.selectedAddress.pickUp &&
      store().location.selectedAddress.dropOff
    ) {
      let _address = {
        pickUp: store().location.selectedAddress.pickUp,
        dropOff: store().location.selectedAddress.dropOff
      };

      axios
        .post("booking", {
          address: _address
        })
        .then(res => {
          dispacth({
            type: ADD_BOOKING_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => {
          dispacth({
            type: ADD_BOOKING_ERROR,
            payload: err
          });
        });
    }
  };
}

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

export function enableLoader() {
  return dispatch => {
    dispatch({
      type: LOADING
    });
  };
}

export function enableCLoader() {
  return dispatch => {
    dispatch({
      type: CLOADING
    });
  };
}

export function cancelBooking(bookingId) {
  return dispacth => {
    axios
      .patch(`booking/${bookingId}`, { status: 1 })
      .then(() => {
        dispacth({
          type: CANCEL_BOOKING
        });
      })
      .catch(error => console.log(error));
  };
}
