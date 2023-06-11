import React from "react";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Space } from "antd";

const AuthorityManage: React.FC = () => {
  return (
    <>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        账户权限管理
      </div>
      <ProForm
        submitter={{
          render: () => {
            return [
              <Space>
                <Button type="primary">启用</Button>
                <Button type="primary" danger>
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
