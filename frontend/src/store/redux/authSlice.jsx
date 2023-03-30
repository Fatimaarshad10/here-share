import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const getPostData = async () => {
  const postsResponse = await fetch("http://localhost:3000/post", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  const postsData = await postsResponse.json();

  // Iterate over all posts and fetch user data for each post
  const postsWithData = await Promise.all(
    postsData.map(async (post) => {
      const userResponse = await fetch(
        `http://localhost:3000/user/${post.user}/get`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const userData = await userResponse.json();
      return {
        ...post,
        user: userData,
      };
    })
  );

  return postsWithData;
};
const getLatestdata = async () => {
  const postsResponse = await fetch("http://localhost:3000/post", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  const postsData = await postsResponse.json();
  const sortData = postsData.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Iterate over all posts and fetch user data for each post
  const postsWithData = await Promise.all(
    sortData.map(async (post) => {
      const userResponse = await fetch(
        `http://localhost:3000/user/${post.user}/get`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const userData = await userResponse.json();
      return {
        ...post,
        user: userData,
      };
    })
  );

  return postsWithData;
};
export const onePost = createAsyncThunk("posts/OnePost", async () => {
  const postsData = await getPostData();
  return postsData;
});
export const LatestPost = createAsyncThunk("posts/latestPost", async () => {
  const postsData = await getLatestdata();
  return postsData;
});
const initialState = {
  isAuthenticated: false,
  session: null,
  userpost: null,
  latest: null,
};

const authSlice = createSlice({
  name: "user",
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
    [LatestPost.fulfilled]: (state, action) => {
      state.latest = action.payload;
    },
    [onePost.fulfilled]: (state, action) => {
      state.userpost = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess, Success } =
  authSlice.actions;

export default authSlice.reducer;
