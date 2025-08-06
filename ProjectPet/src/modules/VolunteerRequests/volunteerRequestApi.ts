import type { Envelope } from "../../shared/models/responses";
import { api } from "../../shared/api/api"
import { VolunteerRequestEndpoints } from "../../shared/api/endpoints";
import type { CreateVolunteerRequest } from "./requests/createVolunteerRequest";

export const AuthApi = api.injectEndpoints({
    endpoints: builder => ({
        newVolunteerRequest: builder.mutation<string, CreateVolunteerRequest>({
            query: (request) => ({url: VolunteerRequestEndpoints.PostNewRequest, body: request, method: "POST"}),
            transformResponse: (res : Envelope<string>) : string => {
                return res.result!;
            },
        }),
    })
});
    
export const {
    useNewVolunteerRequestMutation
} = AuthApi;