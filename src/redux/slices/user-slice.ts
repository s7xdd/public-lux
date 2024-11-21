import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sliceNames } from '@/constants/redux';
import { getUser } from '@/storage';

interface UserState {
  token: string;
  displayName: string;
  email: string;
  user_nicename: string;
  phone: string;
  isVerified: boolean;
}

const initialState: UserState = {
  token: '',
  displayName: '',
  email: '',
  user_nicename: '',
  phone: '',
  isVerified: false,
};

const userSlice = createSlice({
  name: sliceNames.user,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      const userData = action.payload;
      if (userData === null) {
        return initialState;
      }
      try {
        const parsedUserData = typeof userData === 'string' ? JSON.parse(userData) : userData;
        state.token = parsedUserData?.token || '';
        state.displayName = parsedUserData?.displayName || '';
        state.email = parsedUserData?.email || '';
        state.user_nicename = parsedUserData?.user_nicename || '';
        state.phone = parsedUserData?.phone || '';
        state.isVerified = parsedUserData?.isVerified || false;
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    },
    // setUserFromStorage: (state) => {
    //   // This will initialize the user from localStorage if available
    //   const userData = getUser();
    //   if (userData) {
    //     state.token = userData.token || '';
    //     state.displayName = userData.displayName || '';
    //     state.email = userData.email || '';
    //     state.user_nicename = userData.user_nicename || '';
    //     state.phone = userData.phone || '';
    //     state.isVerified = userData.isVerified || false;
    //   }
    // },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;