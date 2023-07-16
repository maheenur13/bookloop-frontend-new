import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICartState {
  products: IProduct[];
  total:number;
}

const initialState: ICartState = {
  products: [],
  total:0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isExistingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isExistingProduct) {
        isExistingProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
    decreaseQuantity: (state, action: PayloadAction<IProduct>) => {
      const isExistingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (isExistingProduct && isExistingProduct.quantity! > 1) {
        isExistingProduct.quantity! -= 1;
      } else {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      state.total -= action.payload.price;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
