import { IReadingPlans, IWishList } from '@/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';

interface IUserState {
  user: {
    id: string | null;
    email: string | null;
    readingPlans: IReadingPlans[] | [];
    wishList: IWishList[] | [];
  };
}

const initialState: IUserState = {
  user: {
    id: null,
    email: null,
    wishList: [],
    readingPlans: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState['user']>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {
        email: null,
        id: null,
        wishList: [],
        readingPlans: [],
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
