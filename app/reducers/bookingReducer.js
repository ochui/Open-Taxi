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
  TOGGLE_PAYMENT_MODAL_C,
  CANCEL_BOOKING,
  CLOADING,
  GET_ACTIVE_BOOKINGS,
  CAR_BOOKING_SUCCESSFUL,
  CAR_BOOKING_FAILED,
  ENABLE_VERIFICATION_SPINNER,
  DISABLE_VERIFICATION_SPINNER
} from "../actions/types";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  booking: {},
  loading: false,
  isModalVisible: false,
  isModalCVisible: false,
  searchingForDriver: false,
  spinner: false,
  //payment modal
  paymentMethod: "card",
  paymentModalStatus: false,
  paymentModalCStatus: false,
  cloader: false,
  pastBookings: []
};

const persistConfig = {
  key: "booking",
  storage: storage,
  blacklist: [
    "isModalVisible",
    "isModalCVisible",
    "paymentModalStatus",
    "paymentModalCStatus",
    "cloader",
    "spinner"
  ]
};

const bookingReducer = (state = initialState, action) => {
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
    case TOGGLE_PAYMENT_MODAL_C:
      return update(state, {
        paymentModalCStatus: {
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
    case CAR_BOOKING_SUCCESSFUL:
      return update(state, {
        paymentModalCStatus: {
          $set: false
        }
      });
    case ENABLE_VERIFICATION_SPINNER:
      return update(state, {
        spinner: {
          $set: true
        }
      });
    case DISABLE_VERIFICATION_SPINNER:
      return update(state, {
        spinner: {
          $set: false
        }
      });
    default:
      return state;
  }
};

export default persistReducer(persistConfig, bookingReducer);
