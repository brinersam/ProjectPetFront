import type { Envelope } from "../../models/responses";
import { AuthEndpoints } from "../endpoints";
import type { LoginResponse } from "./Models/LoginResponse";
import type { LoginRequest } from "./Requests/LoginRequest";
import type { RegisterRequest } from "./Requests/RegisterRequest";
import { api } from "../api"

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

        refresh: builder.mutation<Envelope<string>, string>({
            query: (request) => ({url: AuthEndpoints.Register, body: request, method: "POST"}),
        })
    })
});
    
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshMutation
} = AuthApi;