import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./Reducer/MainReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
  let persistor = persistStore(store);
  return { store, persistor };
};
