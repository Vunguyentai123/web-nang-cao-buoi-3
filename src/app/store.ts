import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import { productsRtkApi } from '../features/products/productsRtkQuery';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsRtkApi.reducerPath]: productsRtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsRtkApi.middleware),
  devTools: import.meta.env.DEV,
});

// Infer types từ chính cấu hình store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
