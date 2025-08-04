import type { Envelope, PagedList } from "../../shared/models/responses";
import { PetEndpoints } from "../../shared/api/endpoints";
import { api } from "../../shared/api/api"
import type { PetResponse } from "./models/PetResponse";
import type { GetPetsPaginatedRequest } from "./models/requests/GetPetsPaginatedRequest";

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