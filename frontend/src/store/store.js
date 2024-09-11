import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/userSlice";
import postReducer from "../Slice/postSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    post: postReducer,
  },
});

export const persistor = persistStore(store);
