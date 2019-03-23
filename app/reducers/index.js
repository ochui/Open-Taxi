import { combineReducers } from "redux";
import locationReducer from "./locationReducer";
import authReducer from "./authReducer";
//import paymentReducer from "./paymentReducer";
import bookingReducer from "./bookingReducer";
import companyReducer from "./companyReducer";
import carsReducer from "./carsReducer";
import pushNotificationReducer from "./pushNotificationReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  location: locationReducer,
  auth: authReducer,
  form: formReducer,
  //payment: paymentReducer,
  company: companyReducer,
  booking: bookingReducer,
  cars: carsReducer,
  notification: pushNotificationReducer
});
