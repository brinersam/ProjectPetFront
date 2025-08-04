import type { PetPhotoResponse } from "./PetPhotoResponse";

export type PetResponse = {
    id: string,
    volunteerId: string,
    speciesID: string,
    breedID: string,
    name: string,
    description: string,
    coat: string,
    dateOfBirth: string,
    status: string,
    photos: PetPhotoResponse[]
}