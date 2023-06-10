import React, { useState } from "react";
import { Button } from "antd";
import {
  ProForm,
  ProFormText,
  ProFormDependency,
  ProFormSelect,
  ProFormDatePicker,
  ProFormDigit,
} from "@ant-design/pro-components";

const StudentInfo: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  function buttonClickHandler(e: any) {
    console.log(e);
    setIsEdit(!isEdit);
  }
  return (
    <div>
      <div style={{ fontSize: "20px", marginBottom: "16px", color: "#4780f7" }}>
        学生信息
      </div>
      <ProForm
        readonly={!isEdit}
        initialValues={{
          name: "",
          major: "",
          class: "",
          enrollment_year: "",
          graduation_year: "",
          company: "",
          city: "",
          phone: "",
          email: "",
        }}
        submitter={{
          render: () => {
            return [
              <Button
                htmlType="button"
                onClick={(e) => buttonClickHandler(e)}
                key="edit"
              >
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
