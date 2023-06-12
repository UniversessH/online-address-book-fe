import React, { useEffect, useState } from "react";
import { Table, Button, Divider, Spin, message } from "antd";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { ColumnsType } from "antd/es/table";
import {
  fetchMajorList,
  deleteMajor,
  addMajor,
} from "../../../../../network/apis";

interface DataType {
  major: string;
}

const MajorManage: React.FC = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState("");
  useEffect(() => {
    fetchMajorData();
  }, []);

  const rowSelection = {
    onChange: (__: React.Key[], selectedRows: DataType[]) => {
      setSelectedData(selectedRows[0].major);
    },
  };

  const fetchMajorData = async () => {
    try {
      setIsLoading(true);
      const res: any = await fetchMajorList();
      const newData = res.data.majors.map((item, index) => {
        return {
          major: item,
          key: index,
        };
      });
      setData(newData);
      message.success(res.message);
      setIsLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      message.error("加载数据列表出错");
      setIsLoading(false);
    }
  };

  const deleteMajorHandler = async () => {
    try {
      await deleteMajor(selectedData);
      message.success("删除成功");
      fetchMajorData();
    } catch (error) {
      console.log(error);
    }
  };

  const addMajorHandler = async (value) => {
    console.log(value);
    try {
      await addMajor(value.major);
      message.success("添加成功");
      fetchMajorData();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "专业名称",
      key: "major",
      dataIndex: "major",
    },
  ];

  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        专业信息管理
      </div>
      <ProForm onFinish={addMajorHandler} style={{ marginBottom: "16px" }}>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="major"
            label="新增专业"
            placeholder="请输入新增专业名称"
          />
        </ProForm.Group>
      </ProForm>
      <Divider />
      <div style={{ fontSize: "14px", marginBottom: "16px" }}>删除专业信息</div>
      <Spin spinning={isLoading}>
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          style={{ width: "50%" }}
          columns={columns}
          dataSource={data}
        ></Table>
      </Spin>
      <Button type="primary" danger onClick={deleteMajorHandler}>
        删除
      </Button>
    </div>
  );
};

export default MajorManage;
