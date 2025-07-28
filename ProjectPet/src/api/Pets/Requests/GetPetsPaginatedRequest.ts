export interface GetPetsPaginatedRequest {
    Page : number,
    Take : number,
    Filters : GetPetsPaginatedFilters | undefined,
    Sorting : GetPetsPaginatedSorting | undefined
}

export interface GetPetsPaginatedFilters {
    volunteerId? : string,
    name? : string,
    age? : number,
    speciesName? : string,
    breedName? : string,
    coat? : string,
}

export interface GetPetsPaginatedSorting {
    volunteerId? : boolean,
    name? : boolean,
    age? : boolean,
    coat? : boolean,
    sortAsc? : boolean,
}