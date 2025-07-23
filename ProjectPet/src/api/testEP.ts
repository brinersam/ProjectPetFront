import { TestEndpoints } from "./endpoints";
import type { Envelope } from "../models/responses";
import { api } from "./axiosFactory";

export async function GetTestEPAsync(endpoint : TestEndpoints ) : Promise<Envelope<string[]>>
{
    const response = await api
     .get<Envelope<string[]>>(endpoint);

    await new Promise((resolve) => setTimeout(resolve,3000));

    return response?.data;
}
