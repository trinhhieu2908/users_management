import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isUserModalVisible: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openUserModal: (state) => {
      state.isUserModalVisible = true;
    },
    closeUserModal: (state) => {
      state.isUserModalVisible = false;
    },
  },
});

export const { name, actions, reducer } = modalSlice;
