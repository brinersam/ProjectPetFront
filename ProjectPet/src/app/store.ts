import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthSliceName } from "../modules/Auth/AuthSlice"
import { api } from "../shared/api/api";
import { router } from "./router";

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
