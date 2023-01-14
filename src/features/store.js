import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//mobile
import commonApp from "./mobile/commonApp";

//admin
import commonAdmin from "./admin/commonAdmin";
import otherSlice from "./admin/otherSlice";


const reducers = combineReducers({
  //app
  commonApp: commonApp,
  //admin
  commonAdmin: commonAdmin,
  other: otherSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["commonApp"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
