import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProductsState {
  status: boolean;
  priceRange: number;
}

const initialState: IProductsState = {
  status: false,
  priceRange: 150,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, setPriceRange } = productsSlice.actions;

export default productsSlice.reducer;
