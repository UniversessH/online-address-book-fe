import axios, { AxiosResponse } from "axios";
import { message } from "antd";

const client = axios.create({
  baseURL: "http://120.76.142.160:7878",
  timeout: 10000,
});

client.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem("token");
    if (config.headers && token) config.headers.token = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default client;
