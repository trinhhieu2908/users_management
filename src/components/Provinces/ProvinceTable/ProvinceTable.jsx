import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import React from "react";
import { actions as modalActions } from "../../../redux/modal/slice";

const ProvinceTable = (props) => {
  const columns = [
    {
      title: "Stt",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (_, _r, index) => <p>{index + 1}</p>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Loại",
      dataIndex: "division_type",
      key: "division_type",
    },
    {
      title: "Mã Điện Thoại",
      dataIndex: "phone_code",
      key: "phone_code",
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
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      scroll={{ x: 1500 }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            dispatch(modalActions.openUserModal(record));
          },
        };
      }}
      className="user-table"
      columns={columns}
      rowKey="code"
      dataSource={props.provincesData}
    />
  );
};

export default ProvinceTable;
