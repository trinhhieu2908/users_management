import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { name, actions, reducer } = usersSlice;
