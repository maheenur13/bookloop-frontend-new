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
  };
}

const initialState: IUserState = {
  user: {
    id: null,
    email: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState['user']>) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = { email: null, id: null };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
