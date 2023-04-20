import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalSelectors } from "../../../redux/modal/selector";
import { usersSelectors } from "../../../redux/users/selector";
import { actions as modalActions } from "../../../redux/modal/slice";
import { actions as userActions } from "../../../redux/users/slice";
import { useMutation } from "react-query";
import axiosConfig from "../../../utils/axios";
import { DELETE_SELECTION } from "../../../utils/constants/constant";
import { ConditionalWrapper } from "../../Common/ConditionalWrapper";

const ConfirmDeleteUserModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(modalSelectors.getDeleteModalVisible);
  const userOnModal = useSelector(modalSelectors.getUserOnModal);
  const usersSelectedData = useSelector(usersSelectors.getUsersSelected);

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation(
    (id) => {
      return axiosConfig.delete(`/users/${id}.json`);
    },
    {
      onSuccess: (response) => {
        if (userOnModal === DELETE_SELECTION) {
          usersSelectedData.forEach((item) => {
            dispatch(userActions.removeUserFromList(item));
          });
          dispatch(userActions.setSelectedUsers([]));
          notification.destroy();
          notification.success({
            description: "Successfully deleted user",
          });
        } else {
          dispatch(userActions.removeUserFromList(userOnModal.id));
          notification.success({
            description: "Successfully deleted user",
          });
        }

        onCancel();
      },
      onError: (error) => {
        if (error) {
          notification.error({
            description: "Failed to delete user",
          });
        }
      },
    }
  );

  const onConfirm = () => {
    if (userOnModal === DELETE_SELECTION) {
      usersSelectedData.forEach((item) => {
        deleteUser(item);
      });
    } else {
      deleteUser(userOnModal.id);
    }
  };
  const onCancel = () => {
    dispatch(modalActions.closeDeleteModal());
  };
  return (
    <Modal
      title="Modal"
      centered
      icon={<ExclamationCircleOutlined />}
      open={isVisible}
      footer={null}
      onCancel={onCancel}
    >
      <ConditionalWrapper
        condition={isDeleting}
        wrapper={(children) => <Spin>{children}</Spin>}
      >
        {userOnModal === DELETE_SELECTION ? (
          <p>Are you sure to delete these users?</p>
        ) : (
          <p>Are you sure to delete user {userOnModal?.fullName}?</p>
        )}
        <div className="d-flex justify-content-end mt-1">
          <Button htmlType="submit" className="mr-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </ConditionalWrapper>
    </Modal>
  );
};

export default ConfirmDeleteUserModal;
