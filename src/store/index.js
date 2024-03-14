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

const rootReducer = combineReducers({
    modal: dataSlice.reducer
});

//Persistor to keep the data in store even after loading
const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: storage,
        // blacklist: ["drawer","dataModal","templateModal"],
    },
    rootReducer
);


//Redux store
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