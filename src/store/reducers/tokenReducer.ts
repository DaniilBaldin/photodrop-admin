import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('tokenJWT');

type Token = string | null;

type Tokens = {
  token: Token | null;
};

const initialState: Tokens = {
  token: initialToken || null,
};

export const tokenReducer = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    addToken(state: Tokens, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
    removeToken(state: Tokens) {
      state.token = null;
    },
  },
});

export const { addToken, removeToken } = tokenReducer.actions;

export default tokenReducer.reducer;
