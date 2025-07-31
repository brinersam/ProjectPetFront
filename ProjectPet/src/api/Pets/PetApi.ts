import type { Envelope, PagedList } from "../../models/responses";
import { PetEndpoints } from "../endpoints";
import { api } from "../api"
import type { PetResponse } from "./Models/PetResponse";
import type { GetPetsPaginatedRequest } from "./Requests/GetPetsPaginatedRequest";

export const PetApi = api.injectEndpoints({
    endpoints: builder => ({
        getPetsPaginated: builder.query<Envelope<PagedList<PetResponse[]>>, GetPetsPaginatedRequest>({
            query: request => {
                const params = new URLSearchParams();
                params.append('Page', request.Page.toString());

                params.append('Take', request.Take.toString());
                
                if (request.Filters !== undefined) {
                    Object.entries(request.Filters).forEach(([key, value]) => {
                        if (value !== undefined) {
                            params.append(`Filters.${key}`, value!.toString());
                        }
                    })
                };
                
                if (request.Sorting !== undefined) {
                    Object.entries(request.Sorting).forEach(([key, value]) => {
                        if (value !== undefined) {
                            params.append(`Sorting.${key}`, value!.toString());
                        }
                    })
                };

                return {
                    url: `${PetEndpoints.GetPetsPaginated}?${params.toString()}`,
                };
            },
        }),
        
        getPetById: builder.query<Envelope<PetResponse>, number>({
            query: petId => `${PetEndpoints.GetPetById}?${petId}`
        })
    })
});
    
export const {
    useGetPetsPaginatedQuery,
    useGetPetByIdQuery
} = PetApi;