declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    auth: import("../Models/AuthSliceModel").AuthState;
} & import("redux-persist/es/persistReducer").PersistPartial, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        auth: import("../Models/AuthSliceModel").AuthState;
    } & import("redux-persist/es/persistReducer").PersistPartial, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const persistor: import("redux-persist").Persistor;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
