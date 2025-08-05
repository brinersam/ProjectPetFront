import ExceptionsHelper from "../../../shared/helpers/exceptionsHelper";
import { PATHS } from "../../../shared/paths";
import { createAppAsyncThunk } from "../../../app/reduxTypes";
import { initialState, type AuthState } from "../AuthSlice";
import { type LoginResponse } from "../models/loginResponse";
import { AuthApi } from "../AuthApi";
import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const loginThunk = createAppAsyncThunk<LoginResponse, {email:string, password:string}>("auth/login", async (arg, {dispatch, rejectWithValue, extra}) => {
    try {
          const login = AuthApi.endpoints.login;

          const result = await dispatch(login.initiate(arg)).unwrap();

          extra.router.navigate(PATHS.Profile);

          return result;
        } 
        catch (exception) {
          const error = ExceptionsHelper.FormatError(exception);
          return rejectWithValue(error);
        }
})

export const loginCases = (builder : ActionReducerMapBuilder<AuthState>) => {
    builder
        .addCase(loginThunk.fulfilled, (state, {payload}) => 
        {
            state.status = "success";
            state.isAuthenticated = true;
            state.accessToken = payload.accessToken;
            state.roles = payload.roles;
        })
        .addCase(loginThunk.pending, (state) => {
            state.status = "loading";
        })
        .addCase(loginThunk.rejected, (_, action) => ({...initialState, status : "failed", loginError: action.payload}))
}