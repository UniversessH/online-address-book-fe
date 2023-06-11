import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormDependency,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDigit,
} from "@ant-design/pro-components";
import { ColumnsType } from "antd/es/table";

const ApproveStudent: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const testData = [
    {
      name: "123",
      phone: "123",
      reason: "12412",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width:"15%"
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
      width:"15%"
    },
    {
      title: "申请理由",
      dataIndex: "reason",
      key: "reason",
      width:"50%"
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space>
          <Button type="primary">通过</Button>
          <Button type="primary" danger>拒绝</Button>
        </Space>
      ),
    },
  ];

  function buttonClickHandler(e: any) {
    console.log(e);
    setIsEdit(!isEdit);
  }
  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        注册账户审批
      </div>
      <Table columns={columns} dataSource={testData} />
    </div>
  );
};

export default ApproveStudent;
