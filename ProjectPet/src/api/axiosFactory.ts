import axios from "axios";
import { API_PATH } from "./endpoints";

export const api = axios.create({
    baseURL : API_PATH,
    withCredentials: true
})
