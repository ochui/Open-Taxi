import {
  REGISTER,
  TOKEN_REQUEST,
  TOKEN_RECIEVE,
  TOKEN_REQUSET_ERROR,
  CLEAR_TOKEN,
  TOKEN_IS_VALID,
  TOKEN_IS_PRESENT,
  PROFILE_LOADED,
  EDIT_LOADER
} from "../actions/types";
import update from "immutability-helper";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  token: false,
  isLoading: false,
  isAuthenticated: false,
  hasToken: false,
  userData: {},
  editLoading: false,
  userDataLoaded: false,
  error: {}
};

const persistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["isLoading", "editLoading", "error"]
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_REQUEST:
      return update(state, {
        isLoading: {
          $set: true
        },
        error: {
          $set: undefined
        }
      });
    case REGISTER:
      return update(state, {
        // token: {
        //   $set: action.payload,
        // },
        isLoading: {
          $set: true
        }
      });
    case TOKEN_RECIEVE:
      return update(state, {
        token: {
          $set: action.payload
        },
        isLoading: {
          $set: false
        },
        hasToken: {
          $set: true
        }
      });
    case TOKEN_REQUSET_ERROR:
      return update(state, {
        isLoading: {
          $set: false
        },
        hasToken: {
          $set: false
        },
        error: {
          $set: action.payload
        }
      });
    case CLEAR_TOKEN:
      return update(state, {
        token: {
          $set: false
        },
        isAuthenticated: {
          $set: false
        },
        userData: {
          $set: null
        },
        hasToken: {
          $set: false
        }
      });
    case TOKEN_IS_PRESENT:
      return update(state, {
        hasToken: {
          $set: action.payload
        }
      });
    case PROFILE_LOADED:
      return update(state, {
        userData: {
          $set: action.payload
        },
        editLoading: {
          $set: false
        },
        userDataLoaded: {
          $set: true
        }
      });
    case EDIT_LOADER:
      return update(state, {
        editLoading: {
          $set: true
        }
      });
    default:
      return state;
  }
};

export default persistReducer(persistConfig, authReducer);
