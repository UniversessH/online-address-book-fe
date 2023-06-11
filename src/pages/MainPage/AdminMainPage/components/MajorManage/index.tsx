import React from "react";
import { Table, Button, Divider } from "antd";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { ColumnsType } from "antd/es/table";

const testData = [
  {
    major: "123",
  },
];

const MajorManage: React.FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "专业名称",
      key: "major",
      dataIndex: "major",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Button type="primary" danger>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        专业信息管理
      </div>
      <ProForm style={{ marginBottom: "16px" }}>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="student_id"
            label="新增专业"
            placeholder="请输入新增专业名称"
          />
        </ProForm.Group>
      </ProForm>
      <Divider />
      <div style={{ fontSize: "14px", marginBottom: "16px" }}>删除专业信息</div>
      <Table
        style={{ width: "50%" }}
        columns={columns}
        dataSource={testData}
      ></Table>
    </div>
  );
};

export default MajorManage;
