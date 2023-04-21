import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  users: [],
  selectedUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    addUser: (state, { payload }) => {
      state.users = [payload, ...state.users];
    },
    updateUserInUsers: (state, { payload }) => {
      const users = state.users;
      users[users.findIndex((x) => x.id === payload.id)] = payload;
      state.users = users;
    },
    removeUserFromList: (state, { payload }) => {
      const users = state.users;
      const usersAfterRemove = users.filter((x) => x.id !== payload);
      state.users = usersAfterRemove;
    },
    setSelectedUsers: (state, { payload }) => {
      state.selectedUsers = payload;
    },
    filterUsersByDate: (state, { payload }) => {
      const users = payload.users;
      const userAfterFilter = users.filter((item) => {
        const dateCreated = new Date(item.dateCreated);
        const startDate = new Date(payload.startDate);
        const endDate = new Date(payload.endDate);
        endDate.setDate(endDate.getDate() + 1);
        return (
          dateCreated.getTime() >= startDate.getTime() &&
          dateCreated.getTime() <= endDate.getTime()
        );
      });
      state.users = userAfterFilter;
    },
  },
});

export const { name, actions, reducer } = usersSlice;
