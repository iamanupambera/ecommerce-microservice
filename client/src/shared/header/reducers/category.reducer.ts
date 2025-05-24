import { createSlice } from '@reduxjs/toolkit';
import type { IReduxShowCategory } from '../interfaces/header.interface';

const initialValue = true;

const categoryContainerSlice = createSlice({
  name: 'showCategoryContainer',
  initialState: initialValue,
  reducers: {
    updateCategoryContainer: (
      state: boolean,
      action: IReduxShowCategory,
    ): boolean => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateCategoryContainer } = categoryContainerSlice.actions;
export default categoryContainerSlice.reducer;
