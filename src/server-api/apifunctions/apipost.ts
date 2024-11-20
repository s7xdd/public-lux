import { apiEndpoints } from "../config/api.endpoints";
import serverConnectAPI from "../config/server-connect-api";

const postAPI = async (postAPIValues: any | undefined): Promise<any> => {
    const { apiEndpoint, hostName, isRemoveWishist, ...restParams } = postAPIValues;
    // console.log('postAPIValues  ', postAPIValues);
    if (restParams.formData) {
        var formData = new FormData();
        for (const newValues in restParams) {
            formData.append(newValues, restParams[newValues]);
        }
        return await serverConnectAPI.post(apiEndpoint, formData, {
            headers: {
                'Origin': hostName,
            }
        });
    } else {
        return await serverConnectAPI.post(apiEndpoint, JSON.stringify(restParams), {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
                'Origin': hostName
            }
        });
    }
};

//Mocking Add to Cart API
// const addToCartAPI = async (newData: any): Promise<any> => {
//     try {
//       const currentCartData = JSON.parse(localStorage.getItem('cartData') || '[]');  
//       const updatedCartData = Array.isArray(currentCartData) ? [...currentCartData, newData] : [newData];
//       localStorage.setItem('cartData', JSON.stringify(updatedCartData));
  
//       // Mocking an Axios response
//       const response = {
//         data: updatedCartData,
//         status: 200,
//         statusText: 'OK',
//         headers: {},
//         config: {},
//       };
  
//       return response;
//     } catch (error) {
//       console.error('Failed to store data in local storage:', error);
//       throw error;
//     }
//   };
  


const apiPost = {
    postAPI,
};

export default apiPost;
