export const API_PATH:string = "http://localhost:80/api/";

export enum TestEndpoints {
    TestUnauthenticated = "Debug/TestUnauthenticated",
    Exception = "Debug/Exception",
    TestAuthenticatedOnly = "Debug/TestAuthenticatedOnly",
    TestAdminOnly = "Debug/TestAdminOnly",
    NonExistant = "Debug/NotAnEp"
  }

export enum AuthEndpoints {
    Login = "Auth/login",
    Register = "Auth/register",
    RefreshTokens = "Auth/refresh-tokens",
  }

export enum PetEndpoints {
  GetPetById = "Pet",
  GetPetsPaginated = "Pet"
}