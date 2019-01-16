import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middlewares = [thunk];

const persistConfig = {
  key: "tr_passenger",
  storage,
  blacklist: ["navigation", "form"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
