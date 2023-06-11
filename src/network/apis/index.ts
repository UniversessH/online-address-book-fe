import client from "../client/request";

interface IUserInfo {
  phone: number;
  password: string;
}

interface IRegisterData {
  name: string;
  phone: string;
  reg_password: string;
  reason: string;
}

export const login = async (userInfo: IUserInfo) => {
  const res = await client.post("/students/login", {
    phone: userInfo.phone,
    password: userInfo.password,
  });
  // toastSth("success", "登陆成功", { theme: "colored" });
  localStorage.setItem("token", res.data.token); //设置token
  localStorage.setItem("is_admin", res.data.is_admin);
};

export const register = async (userData: IRegisterData) => {
  await client.post("/students/register", {
    name: userData.name,
    phone: userData.phone,
    password: userData.reg_password,
    application_reason: userData.reason,
  });
};

// 获取所有注册申请的账号
export const fetchPendingAccount = async () => {
  const res = await client.get("/students/register_show");
  console.log(res);
  return res.data.list;
};

// 通过 / 拒绝申请的账号
export const managePendingAccount = async (data: any) => {
  const res = await client.post("/students/approve", {
    approve: data.isApproved,
    student_id: data.student_id,
    phone: data.phone,
  });
  console.log(res);
};

// 禁用 / 恢复已通过审核的账号
export const manageApprovedAccount = async (disable: boolean) => {
  const res = await client.post("/students/forbidden", { disable: disable });
  console.log(res);
};

// 获取专业信息
export const fetchMajorList = async () => {
  const res = await client.get("/majors");
  console.log(res);
};

// 删除专业信息
export const deleteMajor = async (name: string) => {
  const res = await client.delete("/majors", {
    data: {
      name: name,
    },
  });
  console.log(res);
};
