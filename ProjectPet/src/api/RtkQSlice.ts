import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_PATH, TestEndpoints } from './endpoints';
import type { Envelope } from '../models/responses';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: API_PATH}),
    endpoints: builder => ({
        getTestUnauthenticated: builder.query<Envelope<string[]>,void>({
            query: () => TestEndpoints.TestUnauthenticated
        }),
        getTestAuthenticatedOnly: builder.query<Envelope<string[]>,void>({
            query: () => TestEndpoints.TestAuthenticatedOnly
        })
    })
});

export const {
    useGetTestUnauthenticatedQuery,
    useGetTestAuthenticatedOnlyQuery
} = apiSlice;