import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slicer/AuthSlice"; // Import the auth slice
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from "redux-persist";

// Create the persist configuration for the auth slice
const persistConfig = {
  key: "root", // Key to store persisted data under
  storage, // Specifies storage (localStorage for web)
};
// Combine reducers (for both cart and authentication slices)
const rootReducer = combineReducers({
  auth: authReducer,
});
// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Persistor to manage the persistence
export const persistor = persistStore(store);
// Define RootState type for useSelector
export type RootState = ReturnType<typeof store.getState>;
// Define AppDispatch type for useDispatch
export type AppDispatch = typeof store.dispatch;
export default store;
