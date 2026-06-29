import axios from "axios";
import { data } from "react-router-dom";

const BASE_URL = "http://192.168.51.35:80/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/*
 응답 인터셉터
*/
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // err.config => "방금 실패한 요청에 대한 설정 정보 전체"
    // url, method, headers, params, data(body)
    // 이정보를 가지고 있어야 우리가 실패한 요청 URL로 다시 요청을 보낼 수 있음
    const { config: original, response } = err;
    if (response.status !== 401) {
      return Promise.reject(err);
    }
    const isExpired = String(response.data).includes("토큰만료");

    if (!isExpired || original._retry) {
      return Promise.reject(err);
    }

    original._retry = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await axios.post(`#{BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      localStorage.setItem("accessToken", data, data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      original.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return api(original);
    } catch (e) {}

    ["accessToken", "refreshToken", "userId", "userName", "role"].forEach((k) =>
      localStorage.removeItem(k),
    );

    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    return Promise.reject(e);
  },
);

export default api;
