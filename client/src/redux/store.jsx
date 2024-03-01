import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import auth from "./auth/auth";
import payment from "./payment/payment";

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [payment.reducerPath]: payment.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auth.middleware).concat(payment.middleware)
});

setupListeners(store.dispatch);
export default store;
