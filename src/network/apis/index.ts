import client from "../client/request";

interface IUserInfo {
  phone: number;
  password: string;
}

interface IRegisterData {
  name: string;
  phone: string;
  password: string;
  application_reason: string;
}

export const login = async (userInfo: IUserInfo) => {
  const res = await client.post("/students/login", {
    phone: userInfo.phone,
    password: userInfo.password,
  });
  // toastSth("success", "登陆成功", { theme: "colored" });
  localStorage.setItem("token", res.data.token); //设置token
};

export const register = async (userData: IRegisterData) => {
  const res = await client.post("/students/register", {
    name: userData.name,
    phone: userData.phone,
    password: userData.password,
    application_reason: userData.application_reason,
  });
  // toastSth("success", "登陆成功", { theme: "colored" });
  localStorage.setItem("token", res.data.token); //设置token
};
