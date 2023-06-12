import React, { useRef } from "react";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import type { ProFormInstance } from "@ant-design/pro-components";
import { Button, Space, message } from "antd";
import { manageApprovedAccount } from "../../../../../network/apis";

const AuthorityManage: React.FC = () => {
  const formRef = useRef<ProFormInstance>();

  const clickManageBtnHandler = async (isDisable: boolean) => {
    try {
      await manageApprovedAccount({
        student_id: +formRef?.current?.getFieldValue("student_id"),
        disable: isDisable,
      });
      message.success(`${isDisable ? "已将该账号禁用" : "已启用该账号"}`);
      formRef?.current?.setFieldsValue({
        student_id: "",
      });
    } catch (error) {
      console.log(error);
      message.error("操作出错");
    }
  };

  return (
    <>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        账户权限管理
      </div>
      <ProForm
        formRef={formRef}
        submitter={{
          render: () => {
            return [
              <Space>
                <Button
                  type="primary"
                  onClick={() => clickManageBtnHandler(false)}
                >
                  启用
                </Button>
                <Button
                  type="primary"
                  onClick={() => clickManageBtnHandler(true)}
                  danger
                >
                  封禁
                </Button>
              </Space>,
            ];
          },
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="student_id"
            label="账户ID"
            placeholder="请输入账户ID"
          />
        </ProForm.Group>
      </ProForm>
    </>
  );
};

export default AuthorityManage;
