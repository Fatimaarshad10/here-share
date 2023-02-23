import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      

    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
    registerSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user= action.payload;
    },
    registerFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure } =userSlice.actions;

export default userSlice.reducer;
