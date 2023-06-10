import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
  EditOutlined,
  YuqueOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
  ProFormCheckbox,
} from "@ant-design/pro-components";
import { message, Tabs, Button } from "antd";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

type tabType = "login" | "register";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Login = () => {
  const [loginType, setLoginType] = useState<tabType>("login");
  const formRef = useRef();
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <LoginForm
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
          render: (props, doms) => {
            return [
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/">
                  <Button type="primary">
                    {loginType === "login" ? "登陆" : "注册"}
                  </Button>
                </Link>
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
              name="mobile"
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
              name="mobile"
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
            {/* <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入验证码"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async () => {
                message.success("获取验证码成功！验证码为：1234");
              }}
            /> */}
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
            <ProFormText.Password
              name="confirm"
              dependencies={["password"]}
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
                    if (!value || getFieldValue("password") === value) {
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
