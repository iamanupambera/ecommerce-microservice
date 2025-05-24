import { createSlice } from '@reduxjs/toolkit';
import type { IReduxHeader } from '../interfaces/header.interface';

const initialValue = 'index';

const headerSlice = createSlice({
  name: 'header',
  initialState: initialValue,
  reducers: {
    updateHeader: (state: string, action: IReduxHeader): string => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateHeader } = headerSlice.actions;
export default headerSlice.reducer;
