import axios from "axios";

export const API_PATH:string = "http://localhost:80/api/";

export const api = axios.create({
    baseURL : API_PATH,
    withCredentials: true
})
