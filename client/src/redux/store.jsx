import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "./auth/auth";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auth.middleware),
});

setupListeners(store.dispatch);
export default store;
