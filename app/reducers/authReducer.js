import {
  REGISTER,
  TOKEN_REQUEST,
  TOKEN_RECIEVE,
  TOKEN_REQUSET_ERROR,
  CLEAR_TOKEN,
  HIDE_BVN_SUCCESS_DIALOG,
  HIDE_BVN_ERROR_DIALOG,
  TOKEN_IS_PRESENT,
  PROFILE_LOADED,
  EDIT_LOADER,
  BVN_VERIFICATION_FAILED,
  BVN_VERIFICATION_SUCCESSFULL
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
  error: {},
  verified: false,
  unverified: false
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
    case HIDE_BVN_SUCCESS_DIALOG:
      return update(state, {
        verified: {
          $set: action.payload
        }
      });
    case HIDE_BVN_ERROR_DIALOG:
      return update(state, {
        unverified: {
          $set: action.payload
        }
      });
    case BVN_VERIFICATION_FAILED:
      return update(state, {
        unverified: {
          $set: true
        }
      });
    case BVN_VERIFICATION_SUCCESSFULL:
      return update(state, {
        verified: {
          $set: true
        }
      });
    default:
      return state;
  }
};

export default persistReducer(persistConfig, authReducer);
