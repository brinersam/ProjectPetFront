import type { Envelope } from "../../models/responses";
import { api } from "../axiosFactory";
import type { TestEndpoints } from "../endpoints";

export async function GetTestEPAsync(endpoint : TestEndpoints ) : Promise<Envelope<string[]>>
{
    const response = await api.get<Envelope<string[]>>(endpoint);

    await new Promise((resolve) => setTimeout(resolve,3000));

    return response?.data;
}
