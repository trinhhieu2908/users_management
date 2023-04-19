import React, { useState } from "react";
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import {
  ContactsOutlined,
  PhoneOutlined,
  UserOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { modalSelectors } from "../../../redux/modal/selector";
import { actions as modalActions } from "../../../redux/modal/slice";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../utils/axios";

const UserModal = () => {
  const isVisible = useSelector(modalSelectors.getUserModalVisible);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const resetForm = () => {
    form.resetFields();
  };
  const onCancel = () => {
    dispatch(modalActions.closeUserModal());
  };
  const onSubmit = (data) => {
    const user = {
      fullName: data.fullName,
      birthday: data.birthday.$d,
      phoneNumber: data.phoneNumber,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
      dateCreated: new Date(),
    };
    axiosConfig.post("/users.json", user);
  };
  return (
    <Modal
      open={isVisible}
      footer={null}
      onCancel={onCancel}
      width={800}
      afterClose={resetForm}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        onFinish={onSubmit}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        className="form-add-user"
        form={form}
      >
        <h1 className="form__title">Add New User</h1>
        <Divider />
        <Form.Item
          label={<h6 className="form__label">Name</h6>}
          name="fullName"
          className="form-item-required"
          rules={[{ required: true, message: "Please enter name!" }]}
        >
          <Input
            placeholder="Please enter name"
            suffix={<ContactsOutlined />}
          />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Birthday</h6>}
          name="birthday"
          rules={[{ required: true, message: "Please chose birthday!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Phone number</h6>}
          name="phoneNumber"
          className="form-item-required"
          rules={[
            { required: true, message: "Please enter a phone number!" },
            () => ({
              validator(_, value) {
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder="Basic usage" suffix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Email</h6>}
          name="email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input placeholder="Basic usage" suffix={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Username</h6>}
          name="username"
          rules={[{ required: true, message: "Please enter username!" }]}
        >
          <Input placeholder="Basic usage" suffix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Password</h6>}
          name="password"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          label={<h6 className="form__label">Role</h6>}
          name="role"
          rules={[{ required: true, message: "Please enter role!" }]}
        >
          <Select style={{ width: "100%" }} placeholder="Please select league">
            <Select.Option key="1" value="1">
              <div className="d-flex align-items-center add-match-form__option">
                <p className="option__title"> role 1 </p>
              </div>
            </Select.Option>
            <Select.Option key="2" value="2">
              <div className="d-flex align-items-center add-match-form__option">
                <p className="option__title"> role 2 </p>
              </div>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={<h6 className="form__label"></h6>}>
          <div className="d-flex justify-content-end">
            <Button
              htmlType="submit"
              type="primary"
              className="add-match-form__button"
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
