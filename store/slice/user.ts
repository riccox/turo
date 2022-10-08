import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { Turo } from '@/types';

export interface State {
  accessToken: string | undefined;
  current: Turo.UserProfile | undefined;
}

//  initial state values
export const initialState: State = {
  accessToken: undefined,
  current: undefined,
};

export const userSlice: Slice = createSlice({
  name: 'user',
  initialState: { ...initialState },
  reducers: {
    setCurrentUser(state, action: PayloadAction<Turo.UserProfile>) {
      state.current = { ...action.payload };
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logout: (state, action: PayloadAction<boolean>) => {
      return { ...initialState };
    },
  },
});

// expose actions
export const { logout, setCurrentUser, setAccessToken } = userSlice.actions;
export const userActions = userSlice.actions;

export const selectCurrentUser = (state: AppState) => (state.user as State).current;
export const selectCurrentUsername = (state: AppState) => selectCurrentUser(state)?.username;

export default userSlice.reducer;
