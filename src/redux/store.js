"use client";

// import rootReducers from "./rootReducers";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { authApiSliceReducer } from "./Auth/AuthSlice";
import storage from "redux-persist/lib/storage";
import { shiftDataSliceReducer } from "./ShiftData/ShiftReducer";

const rootReducer = combineReducers({
    auth: authApiSliceReducer,
    shiftData: shiftDataSliceReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions from redux-persist that are non-serializable
                ignoredActions: ["persist/PERSIST"],
                ignoredPaths: ["register"],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
