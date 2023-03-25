import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit';
import axios from "axios";
export const fetchLatestPost = createAsyncThunk(
  "posts/fetchLatestPost",
  async () => {
    const response = await axios.get("http://localhost:4000/post");
    const sortedPosts = response.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedPosts;
  }
);
export const fetchAllPost = createAsyncThunk(
  "posts/fetchAllPost",
  async () => {
    const response = await axios.get("http://localhost:4000/post");
    const sortedPosts = response.data
    return sortedPosts;
  }
);
const initialState = {
  isAuthenticated: false,
  session: null,
  latestPost: null, 
  AllPost : null , 
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
      Success: (state, action) => {
        state.isAuthenticated = true;
        state.session = action.payload;
      },
  },
  extraReducers: {
    [fetchLatestPost.fulfilled]: (state, action) => {
      state.latestPost = action.payload; 
    },
    [fetchAllPost.fulfilled]: (state, action) => {
      state.AllPost = action.payload; 
    },
  },
 
});






export const { loginSuccess, logoutSuccess ,registerSuccess , Success} = authSlice.actions;

export default authSlice.reducer;
