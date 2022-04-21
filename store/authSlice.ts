import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../types/redux";

const initialState: IAuthState = {
  isAuthenticated: false,
  accessToken: "",
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload;
    },
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, logout, storeUserInfo } = authSlice.actions;
export default authSlice.reducer;
