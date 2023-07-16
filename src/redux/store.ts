import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/api.slice';
import authReducer from './features/auth/auth.slice';
import bookReducer from './features/book/book.slice';
import userReducer from './features/user/user.slice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
