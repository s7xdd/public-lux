// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import userReducer from '@/redux/slices/user-slice';
import productsReducer from '@/redux/slices/product-slice';


const productsPersistConfig = {
  key: 'products',
  storage,
  whitelist: ['discountRanges', 'filterBrands', 'filterAttributes'],
};


const rootReducer = combineReducers({
  user: userReducer,
  products: persistReducer(productsPersistConfig, productsReducer),
  // guestUser: guestUserReducer,
  // unverifiedUser: unverifiedUserReducer,
  // modal: modalReducer,
  // snackbar: snackbarReducer,
  // productDetailsData: productDetailsReducer,
  // wishlistData: wishlistReducer,
  // cartData: cartReducer,
  // errorMessage: errorErrorMessageReducer,
  // searchSuggestion: searchSuggestionReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'country', 'guestUser'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
