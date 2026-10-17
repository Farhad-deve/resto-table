import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/06-shared/config";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  access: string | null;
  refresh: string | null;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const initialState: TokenState = {
  access: localStorage.getItem(ACCESS_TOKEN_KEY),
  refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<LoginResponse>) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.access);
      localStorage.setItem(REFRESH_TOKEN_KEY, action.payload.refresh);
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAccessToken = (state: { auth: TokenState }) => state.auth.access;
export const selectRefreshToken = (state: { auth: TokenState }) => state.auth.refresh;
