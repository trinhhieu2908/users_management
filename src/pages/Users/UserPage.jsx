import React, { useEffect } from "react";
import UserTable from "../../components/Users/UserTable/UserTable";
import UserModal from "../../components/Users/AddUserModal/UserModal";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { actions as modalAction } from "../../redux/modal/slice";
import { actions as userAction } from "../../redux/users/slice";
import axios from "axios";
import { getUser } from "../../api/getUsers";

const UserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUser().then((users) => {
      dispatch(userAction.setUsers(users));
    });
  }, []);
  return (
    <>
      <UserModal />
      <div className="d-flex justify-content-end mb-1">
        <Button
          onClick={() => {
            dispatch(modalAction.openUserModal());
          }}
          icon={<PlusOutlined />}
        >
          Add User
        </Button>
      </div>
      <UserTable />
    </>
  );
};

export default UserPage;
