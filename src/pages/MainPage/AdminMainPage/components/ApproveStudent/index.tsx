import React, { useEffect, useState } from "react";
import { Button, Divider, Space, Spin, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  fetchPendingAccount,
  managePendingAccount,
} from "../../../../../network/apis";
interface DataType {
  id: number;
  name: string;
  phone: string;
  application_reason: string;
}

interface ISelectedData {
  student_id: number;
  phone: string;
}

const ApproveStudent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<number>();
  const [selectedData, setSelectedData] = useState<ISelectedData>();

  useEffect(() => {
    fetchAccountList();
  }, []);

  const rowSelection = {
    onChange: (__: React.Key[], selectedRows: DataType[]) => {
      setSelectedData({
        student_id: selectedRows[0].id,
        phone: selectedRows[0].phone,
      });
    },
  };

  const fetchAccountList = async () => {
    try {
      setIsLoading(true);
      const res = await fetchPendingAccount();
      const newData = res.map((item: any) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setData(newData);
      setIsLoading(false);
      message.success("数据加载成功");
    } catch (error) {
      message.error("加载数据列表出错");
      console.log(error);
      setIsLoading(false);
    }
  };

  const clickManageBtnHandler = async (status: boolean) => {
    try {
      await managePendingAccount({
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
      <Spin spinning={isLoading}>
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </Spin>
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
