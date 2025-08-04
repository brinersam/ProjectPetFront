import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginCases } from "./thunks/loginThunk";

export const AuthSliceName = "auth";

export interface AuthState {
    accessToken? : string,
    loginError? : string,
    isAuthenticated : boolean,
    roles?: string[],
    status: 'idle' | 'loading' | `success` | 'failed'
}

export const initialState: AuthState = {
    status: "idle",
    isAuthenticated: false
};

const authSlice = createSlice({
    name: AuthSliceName,
    initialState: initialState,
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectLoginStatus: (state) => state.status,
        selectLoginError: (state) => state.loginError,
        selectIsAuthenticated:(state) => state.isAuthenticated,
        selectUserRoles:(state) => state.roles,
    },
    reducers: {
        doLogin: (state, {payload}: PayloadAction<{accessToken : string }>) => {
            state.accessToken = payload.accessToken;
            state.status = "success";
        },

        doLogout: () => initialState
    },
    extraReducers: (builder) => {
        loginCases(builder)
    }
});

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;

export default authSlice.reducer;