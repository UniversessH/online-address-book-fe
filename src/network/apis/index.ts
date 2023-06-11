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
  const res = await client.post("/students/register", {
    name: userData.name,
    phone: userData.phone,
    password: userData.reg_password,
    application_reason: userData.reason,
  });
  // toastSth("success", "登陆成功", { theme: "colored" });
  localStorage.setItem("token", res.data.token); //设置token
};
