const getUserModalVisible = (state) => state?.modal?.isUserModalVisible;

const getDeleteModalVisible = (state) => state?.modal?.isDeleteModalVisible;

const getUserOnModal = (state) => state?.modal?.currentUserOnModal;

export const modalSelectors = {
  getUserModalVisible,
  getDeleteModalVisible,
  getUserOnModal,
};
