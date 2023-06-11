import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  EditOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProFormText,
  ProFormInstance,
} from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { Tabs, Button, message, Modal } from "antd";
import React, { useState, useRef } from "react";
import { login, register } from "../../network/apis";

type tabType = "login" | "register";

const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<tabType>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<ProFormInstance>();

  const navigate = useNavigate();

  const buttonClickHandler = async () => {
    setIsLoading(true);
    if (loginType === "login") {
      try {
        await login(formRef.current?.getFieldsFormatValue?.());
        setIsLoading(false);
        navigate("/", { replace: true });
      } catch (err) {
        setIsLoading(false);
        message.error(err?.response.data.error);
      }
    } else {
      try {
        await register(formRef.current?.getFieldsFormatValue?.());
        setIsModalOpen(true);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        message.error(err?.response.data.msg);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Modal
        title="提示"
        open={isModalOpen}
        footer={[]}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>注册成功后需要管理员进行审核，注册账号暂时无法登陆</div>
        <div>请耐心等待管理员审核通过后尝试登陆</div>
      </Modal>
      <LoginForm
        formRef={formRef}
        logo={
          <YuqueOutlined
            style={{
              fontSize: "32px",
              marginTop: "10px",
              color: " rgb(105, 205, 132)",
            }}
          />
        }
        title="网上通讯录系统"
        subTitle="HELP TO CONNECT"
        submitter={{
          render: () => {
            return [
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  loading={isLoading}
                  type="primary"
                  onClick={buttonClickHandler}
                >
                  {loginType === "login" ? "登陆" : "注册"}
                </Button>
              </div>,
            ];
          },
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as tabType)}
        >
          <Tabs.TabPane key={"login"} tab={"登录"} />
          <Tabs.TabPane key={"register"} tab={"注册"} />
        </Tabs>
        {loginType === "login" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="phone"
              placeholder={"手机号"}
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
        )}
        {loginType === "register" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              name="name"
              placeholder={"姓名"}
              rules={[
                {
                  required: true,
                  message: "请输入姓名！",
                },
              ]}
            />
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <MobileOutlined className={"prefixIcon"} />,
              }}
              name="phone"
              placeholder={"手机号"}
              rules={[
                {
                  required: true,
                  message: "请输入手机号！",
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！",
                },
              ]}
            />
            <ProFormText.Password
              name="reg_password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <ProFormText.Password
              name="confirm"
              dependencies={["reg_password"]}
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"请再次输入密码:"}
              rules={[
                {
                  required: true,
                  message: "请再次输入密码！",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("reg_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次输入的密码不匹配！"));
                  },
                }),
              ]}
            />
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <EditOutlined className={"prefixIcon"} />,
              }}
              name="reason"
              placeholder={"请输入申请注册的理由"}
              rules={[
                {
                  required: true,
                  message: "请输入理由！",
                },
              ]}
            />
          </>
        )}
      </LoginForm>
    </div>
  );
};

export default Login;
