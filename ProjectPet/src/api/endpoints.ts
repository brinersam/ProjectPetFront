export enum TestEndpoints {
    Test = "VolunteerRequests/Test",
    Error = "VolunteerRequests/Error",
    TestAuth = "VolunteerRequests/TestAuth",
    TestAuthFail = "VolunteerRequests/TestAuthFail",
    NonExistant = "VolunteerRequests/TestAuthFail"
  }

export enum AuthEndpoints {
    Login = "Auth/login",
    Register = "Auth/register",
    RefreshTokens = "Auth/refresh-tokens",
  }
