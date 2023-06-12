import React, { useEffect, useState, useRef } from "react";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { searchInfoList } from "../../../../../network/apis";

const InfoSearch: React.FC = () => {
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
      title: "就业单位",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "所在城市",
      dataIndex: "city",
      key: "city",
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
        通讯录查询
      </div>
      <div
        style={{ fontSize: "12px ", marginBottom: "16px", color: "#bfbfbf" }}
      >
        最少填写一个查询项
      </div>
      <ProForm formRef={formRef} onFinish={searchHandler}>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="姓名"
            placeholder="请输入姓名"
          />
          <ProFormText
            width="md"
            name="major"
            label="专业"
            tooltip="在校时修读的专业"
            placeholder="请输入专业名称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="class"
            label="班级"
            tooltip="例如：一班输入 1 即可"
            placeholder="输入班级编号数字"
          />
          <ProFormText label="入学年份" name="enrollment_year" />
        </ProForm.Group>
      </ProForm>
      <Table
        columns={columns}
        style={{ marginTop: "16px" }}
        dataSource={data}
      ></Table>
    </>
  );
};

export default InfoSearch;
