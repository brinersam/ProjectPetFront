import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthSliceName } from "./api/Auth/AuthSlice"
import { api } from "./api/api";
import { router } from "./app/Router";

export const extraStoreArgument = {
    router,
}

export const store = configureStore({
    reducer: {
        [AuthSliceName] : authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({thunk : {extraArgument: extraStoreArgument}})
            .concat(api.middleware)
});
