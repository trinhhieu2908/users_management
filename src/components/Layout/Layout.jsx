import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
import logo from "../../assets/images/logo.png";
import { routes } from "../../utils/constants/routes";
import useDetectMatchingBreakpoint from "../../hooks/useDetectMatchingBreakpoint";

const AppLayout = () => {
  const { isMatchingBreakpoint: isTablet } = useDetectMatchingBreakpoint(768);
  const [collapsed, setCollapsed] = useState(isTablet);

  const navigate = useNavigate();
  const location = useLocation();
  const pathRoute = location.pathname;

  const onNavigate = (route) => {
    console.log(route.key);
    navigate(route.key);
  };

  const logoStyle = collapsed ? "logo-icon-small" : "logo-icon-large";
  const siderStyle = isTablet && collapsed ? "sidebar sidebar-hide" : "sidebar";
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={siderStyle}
      >
        <div className="d-flex justify-content-center align-items-center logo">
          <img className={logoStyle} src={logo} alt="" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          onSelect={onNavigate}
          selectedKeys={[pathRoute]}
          items={[
            {
              key: routes.userPath,
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: routes.provincePath,
              icon: <GlobalOutlined />,
              label: "provinces",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="header d-flex justify-content-between align-items-center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Avatar size={28} icon={<UserOutlined />} />
        </Header>
        <Content
          style={{
            padding: 24,
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
        <Footer className="d-flex justify-content-center align-items-center footer">
          @Copyright Tran Trinh Hieu
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
