import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
