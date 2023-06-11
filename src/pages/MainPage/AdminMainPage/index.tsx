import React, { useState } from "react";
import {
  SafetyOutlined,
  UserAddOutlined,
  ProfileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import ComposeHeader from "./components/ComposeHeader";
import "./index.css";
import StudentInfo from "./components/ApproveStudent";
import InfoSearch from "./components/AuthorityManage";
import MajorManage from "./components/MajorManage";

const { Content, Sider } = Layout;

// const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("账户管理", "sub1", <TeamOutlined />, [
    getItem("注册账户审批", "1", <UserAddOutlined />),
    getItem("账户权限管理", "2", <SafetyOutlined />),
  ]),
  getItem("专业信息管理", "3", <ProfileOutlined />),
];

const InnerContent: React.ReactNode[] = [
  <StudentInfo />,
  <InfoSearch />,
  <MajorManage />,
];

const AdminMainPage: React.FC = () => {
  const [selectedKey, setSelectedkey] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ComposeHeader />
      <Layout>
        <Sider
          className="sider-wrapper"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            className="menu-wrapper"
            style={{ height: "100%", borderRight: 0 }}
            items={items}
            onClick={(e) => {
              setSelectedkey(+e.key - 1);
            }}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: "16px 0",
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {InnerContent[selectedKey]}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminMainPage;
