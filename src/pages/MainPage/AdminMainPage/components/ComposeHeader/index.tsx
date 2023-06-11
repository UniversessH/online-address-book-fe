import React from "react";
import { useNavigate } from "react-router-dom";
import { YuqueOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout } from "antd";

const { Header } = Layout;

const ComposeHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#08979c",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <YuqueOutlined
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px",
            color: "#fadb14",
            marginRight: "10px",
          }}
        />
        <span style={{ color: "#f0f0f0", fontSize: "18px" }}>
          学生通讯录管理系统
        </span>
      </div>
      {/* <Menu theme="dark" mode="horizontal" /> */}

      <Dropdown
        menu={{
          items: [
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "退出登录",
              onClick: function () {
                localStorage.clear();
                navigate("/login");
              },
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
