import React, { useEffect, useState, useRef } from "react";
import { Button, message } from "antd";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { compeleteSelfInfo, fetchSelfInfo } from "../../../../../network/apis";

const StudentInfo: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    getSelfInfo();
  }, []);

  const getSelfInfo = async () => {
    try {
      const res = await fetchSelfInfo();
      console.log(res);
      // setData(res);
      formRef?.current?.setFieldsValue(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelfInfo = async () => {
    try {
      const data = formRef?.current?.getFieldsFormatValue?.();
      await compeleteSelfInfo(data);
    } catch (error) {
      console.log(error);
      message.error("更新出错，请检查是否输入非法值");
    }
  };

  function buttonClickHandler() {
    setIsEdit(!isEdit);
    if (isEdit) {
      updateSelfInfo();
    }
  }
  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        个人信息
      </div>
      <ProForm
        formRef={formRef}
        readonly={!isEdit}
        submitter={{
          render: () => {
            return [
              <Button htmlType="button" onClick={buttonClickHandler} key="edit">
                {isEdit ? "保存并提交" : "编辑"}
              </Button>,
            ];
          },
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="姓名"
          placeholder=""
          disabled
        />
        <ProForm.Group>
          <ProFormText
            width="md"
            name="major"
            label="专业"
            tooltip="在校时修读的专业"
            placeholder="请输入专业名称"
          />
          <ProFormText
            width="md"
            name="class"
            label="班级"
            tooltip="例如：一班输入 1 即可"
            placeholder="输入班级编号数字"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText label="入学年份" name="enrollment_year" />
          <ProFormText label="毕业年份" name="graduation_year" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            label="公司"
            placeholder="请输入就业单位名称"
            name="company"
          />
          <ProFormText
            label="城市"
            placeholder="请输入您当前居住的城市"
            name="city"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            label="电话号码"
            name="phone"
            rules={[
              {
                pattern: /^1\d{10}$/,
                message: "手机号格式错误！",
              },
            ]}
          />
          <ProFormText label="电子邮箱" name="email" />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default StudentInfo;
