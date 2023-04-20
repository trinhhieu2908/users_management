import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isUserModalVisible: false,
  isDeleteModalVisible: false,
  currentUserOnModal: undefined,  
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openUserModal: (state, { payload }) => {
      state.isUserModalVisible = true;
      state.currentUserOnModal = payload;
    },
    closeUserModal: (state) => {
      state.currentUserOnModal = undefined;
      state.isUserModalVisible = false;
    },
    openDeleteModal: (state, { payload }) => {
      state.isDeleteModalVisible = true;
      state.currentUserOnModal = payload;
    },
    closeDeleteModal: (state) => {
      state.currentUserOnModal = undefined;
      state.isDeleteModalVisible = false;
    },
  },
});

export const { name, actions, reducer } = modalSlice;
