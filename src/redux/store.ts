import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cart.slice';
import productsReducer from './features/products/products.slice';
import { apiSlice } from './api/api.slice';
import userReducer from './features/user/user.slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user:userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
