// // redux/slices/errorErrorMessageSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { sliceNames } from '@/constants/redux';

// interface ErrorMessageState {
//     errorMessage: any | null;
// }

// const initialState: ErrorMessageState = {
//     errorMessage: null,
// };

// const errorErrorMessageSlice = createSlice({
//     name: sliceNames.errorMessage,
//     initialState,
//     reducers: {
//         setErrorMessage: (state, action: PayloadAction<any>) => {
//             state.errorMessage = action.payload;
//         },
//         clearErrorMessage: (state) => {
//             state.errorMessage = null;
//         },
//     },
// });

// export const { setErrorMessage, clearErrorMessage } = errorErrorMessageSlice.actions;
// export default errorErrorMessageSlice.reducer;
