import type { Envelope } from "../../models/responses";
import { AuthEndpoints } from "../endpoints";
import { api } from "../api"
import type { LoginResponse } from "./Models/LoginResponse";
import type { LoginRequest } from "./Requests/LoginRequest";
import type { RegisterRequest } from "./Requests/RegisterRequest";

export const AuthApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<Envelope<LoginResponse>, LoginRequest>({
            query: (request) => ({url: AuthEndpoints.Login, body: request, method: "POST"})
        }),

        logout: builder.mutation({
            query: () => ({url: AuthEndpoints.Logout, method: "POST"})
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