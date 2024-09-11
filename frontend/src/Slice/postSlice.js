import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getallPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { getallPost } = postSlice.actions;

export default postSlice.reducer;
