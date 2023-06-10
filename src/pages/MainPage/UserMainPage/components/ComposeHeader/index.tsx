import React from "react";
import { YuqueOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout } from "antd";

const { Header } = Layout;

const ComposeHeader: React.FC = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <YuqueOutlined
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: " rgb(105, 205, 132)",
            marginRight: "10px",
          }}
        />
        <span style={{ color: "#fff", fontSize: "18px" }}>学生通讯录系统</span>
      </div>
      {/* <Menu theme="dark" mode="horizontal" /> */}

      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "退出登录",
            },
          ],
        }}
      >
        <Avatar
          src="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
          size="default"
        />
      </Dropdown>
    </Header>
  );
};

export default ComposeHeader;
