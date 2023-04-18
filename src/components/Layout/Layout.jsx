import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
import logo from "../../assets/logo-red.png";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onNavigate = (route) => {
    console.log(route.key);
    navigate(route.key);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="d-flex justify-content-center align-items-center">
          <img
            style={{
              height: 'auto',
              width: 120,
            }}
            src={logo}
            alt=""
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onSelect={onNavigate}
          defaultSelectedKeys={["user-page"]}
          items={[
            {
              key: "user-page",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            height: 60,
            backgroundColor: "#ffffff",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: 0,
            minHeight: 40,
            backgroundColor: "#ffffff",
          }}
        >
          footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
