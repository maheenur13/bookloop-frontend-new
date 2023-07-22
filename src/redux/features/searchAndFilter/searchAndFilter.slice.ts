import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IState {
  allGenre: string[];
  allPublicationYears: number[];
}

const initialState: IState = {
  allGenre: [],
  allPublicationYears: [],
};

const searchAndFilterSlice = createSlice({
  name: 'searchAndFilterSlice',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string[]>) => {
      for (let index = 0; index < action.payload.length; index++) {
        if (!state.allGenre.includes(action.payload[index])) {
          state.allGenre.push(action.payload[index]);
        }
      }
    },
    setPublicationYears: (state, action: PayloadAction<number[]>) => {
      for (let index = 0; index < action.payload.length; index++) {
        if (!state.allPublicationYears.includes(action.payload[index])) {
          state.allPublicationYears.push(action.payload[index]);
        }
      }
    },
  },
});
export const { setGenre, setPublicationYears } = searchAndFilterSlice.actions;
export default searchAndFilterSlice.reducer;
