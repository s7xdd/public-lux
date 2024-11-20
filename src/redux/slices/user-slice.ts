import { createSlice } from '@reduxjs/toolkit';

import { UserDetails } from '@/types/redux/user';
import { sliceNames } from '@/constants/redux';


const initialState: UserDetails = {};

// const initialState: UserDetails = {
//   _id: '',
//   firstName: '',
//   token: '',
//   userId: '',
//   email: '',
//   status: '',
//   customerImageUrl: '',
//   phone: '',
//   isVerified: false,
// };
const userSlice = createSlice({
  name: sliceNames.user,
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        return initialState;
      }
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;