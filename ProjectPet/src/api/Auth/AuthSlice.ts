import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const AuthSliceName = "auth";

export interface UserState {
    accessToken? : string,
    // userData : UserData  
    status: 'idle' | 'loading' | `success` | 'failed'
}

const initialState: UserState = {
    status: "idle"
};

const authSlice = createSlice({
    name: AuthSliceName,
    initialState: initialState,
    selectors: {
        selectAccessToken: (state) => state.accessToken,
        selectStatus: (state) => state.status,
    },
    reducers: {
        doLogin: (state, action: PayloadAction<{accessToken : string }>) => {
            state.accessToken = action.payload.accessToken;
            // if (action.payload?.accessToken) console.log("auth success!");
            // console.log(`auth failed!: accessToken: ${action.payload.accessToken}`);
            
            state.status = "success";
        
        },

        doLogout: () => initialState
    }
});

export const {doLogin, doLogout} = authSlice.actions;
export const {selectAccessToken, selectStatus} = authSlice.selectors;

export default authSlice.reducer;