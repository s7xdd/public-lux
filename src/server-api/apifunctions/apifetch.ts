import { AxiosResponse } from "axios";
import serverConnectAPI from "../config/server-connect-api";

const fetchAPIData = async (params = {} as any, origin: string | null | undefined): Promise<AxiosResponse> => {
    const { apiEndpoint, ...restParams } = params;

    return await serverConnectAPI.get(apiEndpoint, {
        params: restParams,
        headers: {
            'Origin': origin,
        },
    });
};


    const general = {
        fetchAPIData,
    };

    export default general;

