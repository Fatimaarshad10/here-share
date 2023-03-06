import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated: false,
  session: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.session = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.session = null;
    },
    registerSuccess: (state, action) => {
        state.isAuthenticated = true;
      },
     
  },
});

export const { loginSuccess, logoutSuccess ,registerSuccess} = authSlice.actions;

export default authSlice.reducer;
