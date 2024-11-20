import axios from "axios";

import authStorage, { getData, getToken } from "../../storage";
import { baseURL } from "./base-urls";
import { routes } from "@/config/routes";

const consumerKey = 'ck_ee1698469c4f54c3a6000023b01ea01b1a5ea71e';
const consumerSecret = 'cs_98ffa0d07cf13721a2ceaba6603a9536327005ba';

const serverConnectAPI = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: "application/json", // Set a default Accept header to JSON responses
    },
    auth: {
        username: consumerKey,
        password: consumerSecret,
    },
});



// // Method to fetch nonce
// const fetchNonce = async () => {
//     try {
//         const response = await axios.get(`${baseURL}/wp-json/wc/v3/nonce-endpoint`); // Adjust this URL to your nonce endpoint
//         return response.data.nonce; // Adjust according to the actual response structure
//     } catch (error) {
//         console.error('Error fetching nonce:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };


// ALWAYS NONCE
// Adding an interceptor for the request to include tokens, nonce, and any additional headers
// serverConnectAPI.interceptors.request.use(async function (config) {
//     const authToken = await getToken();
//     const nonce = await fetchNonce(); // Fetch the nonce
//     config.headers["Authorization"] = authToken ? `Bearer ${authToken}` : undefined;
//     config.headers["X-WP-Nonce"] = nonce ? nonce : undefined; // Include nonce in headers
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// NONCE WHEN ONLY REQUIRED
// serverConnectAPI.interceptors.request.use(async function (config) {
//     const authToken = await getToken();
//     // const uuid = await getData('luxmetallic_uuid');
//     config.headers["Authorization"] = authToken ? `Bearer ${authToken}` : undefined;
//     // config.headers["User-Token"] = uuid;
//      // Check if the request is to add an item to the cart
//      if (config.url.includes('/cart/add-item')) {
//         const nonce = await fetchNonce(); // Fetch the nonce only for add-to-cart requests
//         config.headers['X-WP-Nonce'] = nonce ? nonce : undefined;
//     }

//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });


serverConnectAPI.interceptors.request.use(async function (config) {
    const authToken = await getToken();
    // const uuid = await getData('luxmetallic_uuid');
    config.headers["Authorization"] = authToken ? `Bearer ${authToken}` : undefined;
    
    // config.headers["User-Token"] = uuid;
    return config;
}, function (error) {
    return Promise.reject(error);
});


// Adding an interceptor for the response to handle WooCommerce API responses effectively
serverConnectAPI.interceptors.response.use(function (response) {
    if (response.status === 200) {
        if (response.data) {
            if (response.data.status === false) {
                if (response.data.validation) throw response.data.validation;
                if (response.data.message) throw response.data.message;
            }
            return response.data;
        }
        return response;
    } else if (response.status === 201 && response?.data?.reLogin) {
        authStorage.deleteUser();
        window.location.replace(routes.login);
    } else if (response.status === 403) {
        alert("You do not have permission to perform this action!");
    } else if (response.status === 204) {
        throw "No content found";
    } else {
        throw "Unknown database error (code:2)";
    }
}, function (error) {
    if (error && error.response) {
        const { data, status } = error.response;
        if (status === 401) {
            return Promise.reject(data?.errorMsg || data?.message || "Validation error (status 401)");
        } else if (status === 500) {
            return Promise.reject(data?.message || "Internal server error");
        }
        return Promise.reject(error.message || "Unknown error occurred");
    }
    return Promise.reject(error.message || "Network error");
});

export default serverConnectAPI;
