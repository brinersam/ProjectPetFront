import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PATH, AuthEndpoints } from './endpoints';
import type { Envelope } from '../models/responses';
import type { AppState } from '../../app/reduxTypes';
import { Mutex } from 'async-mutex';

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

const mutex = new Mutex();

const baseQueryAuthDecorator : typeof baseQuery = async (args, api, extraOptions) => {
    {
        await mutex.waitForUnlock(); // avoid 401 spam while we're acquiring tokens

        const queryResult = await baseQuery(args,api,extraOptions);
        if (queryResult.error?.status != 401) return queryResult;

        if (mutex.isLocked() == false)
        {
            const release = await mutex.acquire()
            try
            {
                const { authActions } = await import ('../../modules/Auth/AuthSlice');
                // fix for circular dependency 
                // AuthSlice.ts <==:
                //    ⬇            |
                // loginThunk.ts   |
                //    ⬇            |
                // AuthApi.ts      |
                //    ⬇            |
                // api.ts----------|

                const reauthQueryResult = await baseQuery({url: AuthEndpoints.RefreshTokens, method: "POST" }, api, extraOptions)
                if (!reauthQueryResult.data)
                {
                    await baseQuery({url: AuthEndpoints.Logout, method: "POST" },api,extraOptions);
                    await api.dispatch(authActions.doLogout())
                    return queryResult;
                }
                const newAccessToken = (reauthQueryResult.data as Envelope<string>).result;
                api.dispatch(authActions.doLogin({accessToken: newAccessToken}))
            }
            finally
            {
                release();
            }
        }
        else
        {
            await mutex.waitForUnlock();
        }
        return baseQuery(args, api, extraOptions)
    }
};

export const api = createApi({
    baseQuery: baseQueryAuthDecorator,
    endpoints: () => ({}),
    tagTypes: []
});