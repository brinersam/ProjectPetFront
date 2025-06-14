import { AuthEndpoints } from "../endpoints";
import type { Envelope } from "../../models/responses";
import { api, API_PATH } from "../axiosFactory";
import axios from "axios";

export type LoginResponse = {
    refreshToken : string,
    accessToken : string,
    // userData : UserData
}

export type UserData = {
    id: string;
    email: string;
  };

export default class AuthService{
    static async Login(email:string, password:string) : Promise<Envelope<LoginResponse>>
    {
        const response = await api.post<Envelope<LoginResponse>>(AuthEndpoints.Login, {email, password});
        return response?.data;
    }
    
    static async Refresh() : Promise<Envelope<string>>
    {
        const response = await axios.post<Envelope<string>>(`${API_PATH}${AuthEndpoints.RefreshTokens}`, {}, {withCredentials: true});
        return response?.data;
    }

    static async Register(username:string, email:string, password:string) : Promise<any>
    {
        const response = await axios.post<Envelope<string>>(`${API_PATH}${AuthEndpoints.Register}`, {email, username, password});
        return response;
    }

}