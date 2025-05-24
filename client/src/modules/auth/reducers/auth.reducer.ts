import { createSlice } from '@reduxjs/toolkit';
import type {
  IAuthUser,
  IReduxAddAuthUser,
} from '../interfaces/auth.interface';
import { initialAuthUserValues } from '../../../shared/utils/static-data';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthUserValues,
  reducers: {
    addAuthUser: (state: IAuthUser, action: IReduxAddAuthUser): IAuthUser => {
      const { authInfo } = action.payload;
      state = { ...authInfo } as unknown as IAuthUser;
      return state;
    },
    clearAuthUser: (): IAuthUser => {
      return initialAuthUserValues;
    },
  },
});

export const { addAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
