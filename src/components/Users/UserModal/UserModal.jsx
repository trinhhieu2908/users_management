import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
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
import { actions as userActions } from "../../../redux/users/slice";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../../../utils/axios";
import moment from "moment/moment";
import { useMutation } from "react-query";
import { getUserById } from "../../../api/getUserById";
import { getFullDate } from "../../../utils/getDateFormat";
import { ConditionalWrapper } from "../../Common/ConditionalWrapper";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateUsername,
} from "../../../utils/validation";

const UserModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector(modalSelectors.getUserModalVisible);
  const userOnModal = useSelector(modalSelectors.getUserOnModal);

  const { mutate: addUser, isLoading: isSaving } = useMutation(
    (user) => {
      return axiosConfig.post("/users.json", user);
    },
    {
      onSuccess: (response) => {
        getUserById(response.data.name).then((user) => {
          dispatch(userActions.addUser(user));
        });
        notification.success({
          description: "Successfully added user",
        });
        onCancel();
      },
      onError: (error) => {
        if (error) {
          notification.error({
            description: "Failed to add user",
          });
        }
      },
    }
  );

  const { mutate: updateUser, isLoading: isUpdating } = useMutation(
    (data) => {
      console.log(data);
      return axiosConfig.put(`/users/${data.id}.json`, data.user);
    },
    {
      onSuccess: (response) => {
        const user = response.data;
        user.id = userOnModal.id;
        user.key = userOnModal.key;
        dispatch(userActions.updateUserInUsers(user));
        notification.success({
          description: "Successfully updated user",
        });
        onCancel();
      },
      onError: (error) => {
        if (error) {
          notification.error({
            description: "Failed to update user",
          });
        }
      },
    }
  );

  const [form] = Form.useForm();
  useEffect(() => {
    if (userOnModal !== undefined) {
      const initialUser = { ...userOnModal };
      initialUser.birthday = moment(userOnModal?.birthday);
      form.setFieldsValue(initialUser);
    } else {
      form.resetFields();
    }
  }, [userOnModal]);
  const resetForm = () => {
    form.resetFields();
  };
  const onCancel = () => {
    dispatch(modalActions.closeUserModal());
  };
  const onSubmit = (data) => {
    const user = {
      fullName: data.fullName,
      birthday: getFullDate(data.birthday),
      phoneNumber: data.phoneNumber,
      email: data.email,
      username: data.username,
      password: data.password,
      role: data.role,
      dateCreated: new Date(),
    };
    if (userOnModal === undefined) {
      addUser(user);
    } else {
      const data = {
        user: user,
        id: userOnModal.id,
      };
      updateUser(data);
    }
  };

  const labelStyle =
    userOnModal !== undefined ? "form__label" : "form__label-required";
  return (
    <>
      <Modal
        open={isVisible}
        footer={null}
        onCancel={onCancel}
        width={800}
        afterClose={resetForm}
      >
        <ConditionalWrapper
          condition={isSaving || isUpdating}
          wrapper={(children) => <Spin>{children}</Spin>}
        >
          <Form
            form={form}
            name="basic"
            autoComplete="off"
            layout="vertical"
            onFinish={onSubmit}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            className="form-add-user"
          >
            <h1 className="form__title">Add New User</h1>
            <Divider />
            <Form.Item
              label={<h6 className={labelStyle}>Name</h6>}
              name="fullName"
              className="form-item-required"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error("Please enter a name"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                placeholder="Please enter name"
                suffix={<ContactsOutlined />}
              />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Birthday</h6>}
              name="birthday"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please select a birthday")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <DatePicker format="MM/DD/YYYY" />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Phone number</h6>}
              name="phoneNumber"
              className="form-item-required"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please enter a phone number")
                      );
                    } else if (!validatePhoneNumber(value)) {
                      return Promise.reject(
                        new Error("Phone number is not valid")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                placeholder="Please enter a phone number"
                suffix={<PhoneOutlined />}
              />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Email</h6>}
              name="email"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please enter a email address")
                      );
                    } else if (!validateEmail(value)) {
                      return Promise.reject(new Error("Email is not valid"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                placeholder="Please enter a email address"
                suffix={<MailOutlined />}
              />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Username</h6>}
              name="username"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please enter a username")
                      );
                    } else if (!validateUsername(value)) {
                      return Promise.reject(
                        new Error("Username must have between 4 and 30 characters")
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                placeholder="Please enter a username"
                suffix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Password</h6>}
              name="password"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error("Please enter a password")
                      );
                    } else if (!validatePassword(value)) {
                      return Promise.reject(
                        new Error(
                          "password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                        )
                      );
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Please enter a password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label={<h6 className={labelStyle}>Role</h6>}
              name="role"
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(new Error("Please select a role"));
                    } else {
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Please select role"
              >
                <Select.Option value="Admin">
                  <div className="d-flex align-items-center add-match-form__option">
                    <p className="option__title"> Admin </p>
                  </div>
                </Select.Option>
                <Select.Option value="User">
                  <div className="d-flex align-items-center add-match-form__option">
                    <p className="option__title"> User </p>
                  </div>
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={<h6 className="form__label"></h6>}>
              <div className="d-flex justify-content-end">
                <Button htmlType="submit" type="primary">
                  {userOnModal === undefined ? "Add" : "Update"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </ConditionalWrapper>
      </Modal>
    </>
  );
};

export default UserModal;
