import { localStorageValues } from "@/constants/local-storage-values";

const key = "luxmetallic";

const storeUser = async (userData) => {
  if (typeof window !== 'undefined') {
    try {
      await localStorage.setItem(key, JSON.stringify(userData));
    } catch (error) {
      console.log("Error storing the user data", error);
      return null;
    }
  } else {
    // Handle scenarios where localStorage is not available (server-side rendering)
    console.log('localStorage is not available on the server-side');
    return null;
  }
};

export const getUser = async () => {
  try {
    const storedUser = await localStorage.getItem(key);
    return ((storedUser) ? JSON.parse(storedUser) : null);
  } catch (error) {
    console.log("Error getting the auth token", error);
    return null;
  }
};

export const getToken = async () => {
  const storedUser = await getUser();
  return storedUser ? storedUser.token : null;
};

const deleteUser = async () => {
  try {
    await localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
    return null;

  }
};

export const storeData = (key, value) => {
  try {
    //alert("x-auth-token storage storeData"+key+" "+value);
    const jsonValue = JSON.stringify(value)
    localStorage.setItem(key, jsonValue)
  } catch (e) {
  }
}

export const getData = (key) => {
  try {
    const jsonValue = localStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error", e);
    return null;
  }
}


export const removeData = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
  }
}

export const getSelectedCountryFromLocalStorage = () => {
  const country = localStorage.getItem(localStorageValues.country);
  return country ? JSON.parse(country) : null;
};

export const getBasicSettingsFromLocalStorage = () => {
  const country = localStorage.getItem(localStorageValues.websiteSettings);
  return country ? JSON.parse(country) : null;
};

export default { storeUser, getUser, getToken, deleteUser, storeData, getData, removeData, getSelectedCountryFromLocalStorage, getBasicSettingsFromLocalStorage };