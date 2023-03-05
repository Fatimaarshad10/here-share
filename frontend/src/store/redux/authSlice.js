import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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
      logout:(state )=>{
        state.session = ' '
        // const data =  Cookies.remove('new')
        // console.log(data )

      },
      exist :()=>{
      
        // const data =  Cookies.get('new')

        // console.log((data))
      }
     
  },
});

export const { loginSuccess, logoutSuccess ,registerSuccess , logout , exist} = authSlice.actions;

export default authSlice.reducer;
