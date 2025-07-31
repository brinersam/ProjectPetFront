import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import authReducer, { AuthSliceName } from "./api/Auth/AuthSlice"
import { useDispatch, useSelector, useStore } from "react-redux";

export const store = configureStore({
    reducer: {
        [AuthSliceName] : authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(api.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppStore = useStore.withTypes<typeof store>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
