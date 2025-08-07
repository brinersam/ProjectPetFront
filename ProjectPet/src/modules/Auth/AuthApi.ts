import type { Envelope } from "../../shared/models/responses";
import { AuthEndpoints } from "../../shared/api/endpoints";
import type { LoginResponse } from "./models/loginResponse";
import type { LoginRequest } from "./models/requests/loginRequest";
import type { RegisterRequest } from "./models/requests/registerRequest";
import { api } from "../../shared/api/api"

export const AuthApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (request) => ({url: AuthEndpoints.Login, body: request, method: "POST"}),
            transformResponse: (res : Envelope<LoginResponse>) : LoginResponse => {
                return res.result!;
            },
        }),

        logout: builder.mutation({
            query: () => ({url: AuthEndpoints.Logout, method: "POST"}),
        }),

        register: builder.mutation<Envelope<string>, RegisterRequest>({
            query: (request) => ({url: AuthEndpoints.Register, body: request, method: "POST"}),
        }),

        refresh: builder.mutation<Envelope<LoginResponse>, void>({
            query: () => ({url: AuthEndpoints.RefreshTokens, method: "POST"}),
        })
    })
});
    
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshMutation
} = AuthApi;