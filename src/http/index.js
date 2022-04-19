import axios from "axios";
import router from "../router";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://192.168.2.18:8001/demo"
      : process.env.VUE_APP_BASE_URL,
  // baseURL: '/api',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // 接口请求超时时间
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    //  获取token
    const paasUserLoginInfo =
      JSON.parse(localStorage.getItem("paasUserLoginInfo")) || "";
    if (paasUserLoginInfo.token) {
      config.headers.token = paasUserLoginInfo.token;
    }
    config.params = { ...config.params };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const responseBody = response.data;
    if (responseBody.status !== "success") {
      return Promise.reject({ error: responseBody?.errors[0]?.errmsg });
    }
    return Promise.resolve(responseBody);
  },
  (error) => {
    try {
      if (error?.response?.status === 401) {
        localStorage.removeItem("adminLoginInfo");
        router.push("/login");
      }
      if (error?.response?.status === 404) {
        return Promise.reject({ error: "找不到接口" });
      }
      return Promise.reject(error.response.data);
    } catch {
      return Promise.reject({ error: "网络异常" });
    }
  }
);
export default service;
