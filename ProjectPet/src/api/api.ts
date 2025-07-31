import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PATH, AuthEndpoints } from './endpoints';
import type { Envelope } from '../models/responses';
import type { AppState } from '../store';
import { doLogin } from './Auth/AuthSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: API_PATH,
    credentials: "include",
    prepareHeaders: (headers, {getState}) => {
        const state = getState() as AppState;
        const accessToken = state.auth.accessToken;

        if (accessToken)
            headers.set("authorization", `Bearer ${accessToken}`)

        return headers;
    }
});

const baseQueryAuthDecorator : typeof baseQuery = async (args, api, extraOptions) => {
    {
        const queryResult = await baseQuery(args,api,extraOptions);
        if (queryResult.error?.status != 401) return queryResult;
        console.log("auth failed! refreshing...");

        const reauthQueryResult = await baseQuery({url: AuthEndpoints.RefreshTokens, method: "POST" }, api, extraOptions)
        if (reauthQueryResult.error) return queryResult;

        const newAccessToken = (reauthQueryResult.data as Envelope<string>).result;

        api.dispatch(doLogin({accessToken: newAccessToken}))
        return baseQuery(args, api, extraOptions)
    }
};

export const api = createApi({
    baseQuery: baseQueryAuthDecorator,
    endpoints: () => ({})
});