import { Dimensions } from "react-native";
import {
  GET_CURRENT_LOCATION,
  GET_CURRENT_REGION,
  GET_INPUT_DATA,
  TOGGLE_SEARCH_RESULTS,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  MAP_DRAGED,
  GET_DISTANCE_MATRIX
} from "../actions/types";
import update from "immutability-helper";
import Geocoder from "react-native-geocoding";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

Geocoder.init("AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s");

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;
const initialState = {
  region: {},
  inputData: {},
  resultType: {},
  predictions: [],
  selectedAddress: {},
  regionLoaded: false
};

const persistConfig = {
  key: "location",
  storage: storage,
  blacklist: ["predictions", "resultType", "inputData", "selectedAddress"]
};

const locationReducer =  (state = initialState, action) => {
  //const { key, val } = action.payload;
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return update(state, {
        region: {
          latitude: {
            $set: action.payload.coords.latitude
          },
          longitude: {
            $set: action.payload.coords.longitude
          },
          latitudeDelta: {
            $set: LATITUDE_DELTA
          },
          longitudeDelta: {
            $set: LONGITUDE_DELTA
          }
        },
        regionLoaded: {
          $set: true
        }
      });

    case GET_CURRENT_REGION:
      return update(state, {
        region: {
          $set: action.payload
        }
      });
    case GET_INPUT_DATA:
      return update(state, {
        inputData: {
          [action.payload.key]: {
            $set: action.payload.value
          }
        }
      });
    case TOGGLE_SEARCH_RESULTS:
      if (action.payload == "pickUp") {
        return update(state, {
          resultType: {
            pickUp: {
              $set: true
            },
            dropOff: {
              $set: false
            }
          },
          predictions: {
            $set: {}
          }
        });
      } else {
        return update(state, {
          resultType: {
            pickUp: {
              $set: false
            },
            dropOff: {
              $set: true
            }
          },
          predictions: {
            $set: {}
          }
        });
      }
    case GET_ADDRESS_PREDICTIONS:
      return update(state, {
        predictions: {
          $set: action.payload
        }
      });
    case GET_SELECTED_ADDRESS:
      var addressType = state.resultType.pickUp ? "pickUp" : "dropOff";
      return update(state, {
        selectedAddress: {
          [addressType]: {
            $set: action.payload
          },
          type: {
            $set: addressType
          }
        },
        resultType: {
          pickUp: {
            $set: false
          },
          dropOff: {
            $set: false
          }
        },
        inputData: {
          [addressType]: {
            $set: action.payload.structured_formatting.main_text
          }
        }
      });
    case MAP_DRAGED:
      addressType = state.resultType.pickUp ? "pickUp" : "dropOff";
      return update(state, {
        selectedAddress: {
          [addressType]: {
            $set: action.payload
          }
        }
      });
    case GET_DISTANCE_MATRIX:
      return update(state, {
        selectedAddress: {
          matrix: {
            $set: action.payload
          }
        }
      });
    default:
      return state;
  }
}

export default persistReducer(persistConfig, locationReducer);