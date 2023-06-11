import React, { useEffect, useState } from "react";
import { Button, Divider, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  fetchPendingAccount,
  managePendingAccount,
} from "../../../../../network/apis";
interface DataType {
  name: string;
  phone: string;
  application_reason: string;
}

const ApproveStudent: React.FC = () => {
  const [data, setData] = useState<number>();
  const [selectedData, setSelectedData] = useState<any>();

  useEffect(() => {
    fetchAccountList();
  }, []);

  const rowSelection = {
    onChange: (selectedRows: DataType[]) => {
      setSelectedData({
        student_id: selectedRows[0].id,
        phone: selectedRows[0].phone,
      });
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const fetchAccountList = async () => {
    try {
      const res = await fetchPendingAccount();
      setData(res);
    } catch (error) {
      message.error("加载数据列表出错");
      console.log(error);
    }
  };

  const clickManageBtnHandler = async (status: boolean) => {
    try {
      managePendingAccount({
        ...selectedData,
        isApproved: status,
      });
      fetchAccountList();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "申请理由",
      dataIndex: "application_reason",
      key: "reason",
      width: "60%",
    },
  ];

  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        注册账户审批
      </div>

      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <Divider />
      <Space style={{ marginTop: "16px" }}>
        <Button type="primary" onClick={() => clickManageBtnHandler(true)}>
          通过
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => clickManageBtnHandler(false)}
        >
          拒绝
        </Button>
      </Space>
    </div>
  );
};

export default ApproveStudent;
