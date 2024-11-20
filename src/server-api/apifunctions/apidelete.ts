import serverConnectAPI from "../config/server-connect-api";

const deleteAPI = async (deleteAPIValues: any): Promise<any> => {
    const { apiEndpoint, ...restParams } = deleteAPIValues;
    return await serverConnectAPI.delete(apiEndpoint);
};

const apiPost = {
    deleteAPI,
};

export default apiPost;
