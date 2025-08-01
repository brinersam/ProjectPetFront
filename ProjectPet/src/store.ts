import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/RtkQSlice";
import userdataReducer from "./api/Auth/AuthSlice"
import petReducer from "./api/Pets/PetsSlice"

export const store = configureStore({
    reducer: {
        userdata: userdataReducer,
        pet: petReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
});