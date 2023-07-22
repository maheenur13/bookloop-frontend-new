import { IBook, IWishList } from '@/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  id: string | null;
  wishList: IBook[];
}

const initialState: IState = {
  id: null,
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'searchAndFilterSlice',
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<IWishList>) => {
      state.id = action.payload.id;
      state.wishList = action.payload.wishList;
    },
  },
});
export const { setWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
