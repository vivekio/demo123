import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from '../slices/productSlice.ts';
import cartReducer from '../slices/cartSlice.ts';
import userReducer from '../slices/userSlice.ts';
import productDetailReducer from '../slices/productDetailSlice.ts';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: persistedCartReducer,
    user: userReducer,
    product: productDetailReducer
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;