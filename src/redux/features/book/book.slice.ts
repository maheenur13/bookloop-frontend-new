import { IBook } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface IState {
  books: IBook[];
}

const initialState: IState = {
  books: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
