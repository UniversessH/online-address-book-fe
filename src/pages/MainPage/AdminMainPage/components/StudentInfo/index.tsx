import React, { useEffect, useState, useRef } from "react";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { searchInfoList } from "../../../../../network/apis";

const StudentInfo: React.FC = () => {
  const [data, setData] = useState<any>();
  const formRef = useRef();

  useEffect(() => {
    getInfoList();
  }, []);

  const getInfoList = async () => {
    try {
      const res = await searchInfoList();
      setData(res.data.list);
      message.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (value) => {
    console.log(value);
    try {
      const res = await searchInfoList(value);
      setData(res.data.list);
      message.success(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "账户ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "班级",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "入学时间",
      dataIndex: "enrollment_year",
      key: "enrollment_year",
    },
    {
      title: "毕业时间",
      dataIndex: "graduation_year",
      key: "graduation_year",
    },
    {
      title: "电子邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话号码",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <>
      <div style={{ fontSize: "20px", marginBottom: "5px", color: "#4780f7" }}>
        学生信息列表
      </div>
      <Table
        columns={columns}
        style={{ marginTop: "16px" }}
        dataSource={data}
      ></Table>
    </>
  );
};

export default StudentInfo;
