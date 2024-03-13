import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import dataSlice from "./dataSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    modal: dataSlice.reducer,
    auth: authSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: storage,
        // blacklist: ["drawer","dataModal","templateModal"],
    },
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof rootReducer>;

export default store;