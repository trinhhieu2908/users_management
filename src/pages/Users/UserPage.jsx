import React, { useEffect } from "react";
import UserTable from "../../components/Users/UserTable/UserTable";
import UserModal from "../../components/Users/UserModal/UserModal";
import { Button, DatePicker, Skeleton, Space, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalAction } from "../../redux/modal/slice";
import { actions as userAction } from "../../redux/users/slice";
import { usersSelectors } from "../../redux/users/selector";
import ConfirmDeleteUserModal from "../../components/Users/ConfirmDeleteUserModal/ConfirmDeleteUserModal";
import { useQuery } from "react-query";
import axiosConfig from "../../utils/axios";
import { DELETE_SELECTION } from "../../utils/constants/constant";

const { RangePicker } = DatePicker;

const UserPage = () => {
  const dispatch = useDispatch();
  const usersSelectedData = useSelector(usersSelectors.getUsersSelected);
  const {
    data: usersList,
    isLoading: isGettingUsers,
    refetch,
  } = useQuery(
    ["users"],
    async () => {
      const response = await axiosConfig.get("users.json");
      const data = await response.data;
      const users = [];
      for (const user in data) {
        const newUser = data[user];
        newUser.id = user;
        newUser.key = user;
        users.push(newUser);
      }
      return users;
    },
    {
      onError: () => {
        notification.error({
          description: "Failed to get users",
        });
      },
    }
  );
  useEffect(() => {
    if (usersList) {
      dispatch(userAction.setUsers(usersList));
    }
  }, [usersList]);

  const onFilterDateCreated = (_, value) => {
    const startDate = value[0];
    const endDate = value[1];
    if (startDate === "" || endDate === "") {
      refetch();
      dispatch(userAction.setUsers(usersList));
    } else {
      refetch();
      dispatch(
        userAction.filterUsersByDate({
          users: usersList,
          startDate: startDate,
          endDate: endDate,
        })
      );
    }
  };

  if (isGettingUsers) {
    return <Skeleton active />;
  }

  return (
    <>
      <UserModal />
      <ConfirmDeleteUserModal />
      <div className="d-flex justify-content-between mb-1 action-user-page">
        <Space direction="horizontal">
          <p>Date Created: </p>
          <RangePicker onChange={onFilterDateCreated} />
        </Space>
        <div className="action-user-page__add">
          {usersSelectedData.length > 0 && (
            <Button
              danger
              className="mr-1 btn-delete-selection"
              onClick={() => {
                dispatch(modalAction.openDeleteModal(DELETE_SELECTION));
              }}
            >
              Delete Selected
            </Button>
          )}
          <Button
            onClick={() => {
              dispatch(modalAction.openUserModal());
            }}
            icon={<PlusOutlined />}
          >
            Add User
          </Button>
        </div>
      </div>
      <UserTable />
    </>
  );
};

export default UserPage;
