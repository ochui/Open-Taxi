import update from "immutability-helper";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import * as types from "../actions/types";

initialState = {
  notifications: null,
  token: null
};

const persistConfig = {
  key: "notification",
  storage: storage,
  blacklist: ["notifications"]
};

const pushNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_NOTIFICATION_TOKEN:
      return update(state, {
        token: {
          $set: action.payload
        }
      });

    case types.HANDLE_NOTIFICATION:
      return update(state, {
        notifications: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
};

export default persistReducer(persistConfig, pushNotificationReducer);
