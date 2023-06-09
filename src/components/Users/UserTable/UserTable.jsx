import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions as modalActions } from "../../../redux/modal/slice";
import { usersSelectors } from "../../../redux/users/selector";
import { actions as userActions } from "../../../redux/users/slice";
import { getFullDateAndTime } from "../../../utils/getDateFormat";
import PasswordCol from "./PasswordCol";
import { hideHalfOfText } from "../../../utils/hideContent";
import useDetectMatchingBreakpoint from "../../../hooks/useDetectMatchingBreakpoint";

const UserTable = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(usersSelectors.getUsers);
  const selectedUsersData = useSelector(usersSelectors.getUsersSelected);
  const { isMatchingBreakpoint: isTablet } = useDetectMatchingBreakpoint(768);
  const { isMatchingBreakpoint: isMobile } = useDetectMatchingBreakpoint(550);
  const [tableSize, setTableSize] = useState("large");
  const [scrollX, setScrollX] = useState({});

  useEffect(() => {
    if (isMobile) {
      setScrollX({ x: 800 });
      setTableSize("middle");
    } else if (isTablet) {
      setScrollX({ x: 1000 });
      setTableSize("middle");
    } else {
      setScrollX({});
      setTableSize("large");
    }
  }, [isTablet, isMobile]);

  const onSelectChange = (newSelectedRowKeys) => {
    dispatch(userActions.setSelectedUsers(newSelectedRowKeys));
  };

  const rowSelection = {
    selectedUsersData,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  const columns = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_, _r, index) => <p>{index + 1}</p>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <p>{hideHalfOfText(text)}</p>,
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      align: "center",
      render: (password) => <PasswordCol password={password} />,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (dateCreated) => <p>{getFullDateAndTime(dateCreated)}</p>,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined
              onClick={(event) => {
                event.stopPropagation();
                dispatch(modalActions.openDeleteModal(record));
              }}
            />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      size={tableSize}
      scroll={scrollX}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            dispatch(modalActions.openUserModal(record));
          },
        };
      }}
      className="user-table"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={usersData}
    />
  );
};

export default UserTable;
