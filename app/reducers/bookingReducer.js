import update from "immutability-helper";
import {
  ADD_BOOKING_SUCCESS,
  ADD_BOOKING_ERROR,
  ADD_BOOKING_WITH_PAYMENT,
  TOGGLE_BOOKING_MODAL,
  TOGGLE_WAITING_MODAL,
  LOADING,
  CHANGE_PAYMENT_METHOD,
  TOGGLE_PAYMENT_MODAL,
  CANCEL_BOOKING,
  CLOADING,
  GET_ACTIVE_BOOKINGS
} from "../actions/types";
const initialState = {
  booking: {},
  loading: false,
  isModalVisible: false,
  searchingForDriver: false,
  //payment modal
  paymentMethod: "card",
  paymentModalStatus: false,
  cloader: false,
  pastBookings: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING_SUCCESS:
      return update(state, {
        booking: {
          active: {
            $set: action.payload
          }
        },
        loading: {
          $set: false
        },
        isModalVisible: {
          $set: false
        },
        searchingForDriver: {
          $set: true
        }
      });
    case ADD_BOOKING_WITH_PAYMENT:
      return update(state, {
        booking: {
          active: {
            $set: action.payload
          }
        },
        loading: {
          $set: false
        },
        isModalVisible: {
          $set: false
        },
        searchingForDriver: {
          $set: true
        },
        paymentModalStatus: {
          $set: false
        }
      });
    case ADD_BOOKING_ERROR:
      return update(state, {
        loading: {
          $set: false
        }
      });
    case LOADING:
      return update(state, {
        loading: {
          $set: true
        }
      });
    case CLOADING:
      return update(state, {
        cloader: {
          $set: true
        }
      });
    case TOGGLE_BOOKING_MODAL:
      return update(state, {
        isModalVisible: {
          $set: action.payload
        }
      });
    case TOGGLE_WAITING_MODAL:
      return update(state, {
        searchingForDriver: {
          $set: action.payload
        }
      });
    case CHANGE_PAYMENT_METHOD:
      return update(state, {
        paymentMethod: {
          $set: action.payload
        }
      });
    case TOGGLE_PAYMENT_MODAL:
      return update(state, {
        paymentModalStatus: {
          $set: action.payload
        }
      });
    case CANCEL_BOOKING:
      return update(state, {
        booking: {
          $unset: ["active"]
        },
        searchingForDriver: {
          $set: false
        },
        cloader: {
          $set: false
        }
      });
    case GET_ACTIVE_BOOKINGS:
      return update(state, {
        pastBookings: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
};
