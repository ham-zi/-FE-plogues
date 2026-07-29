import axios from "axios";
import { data } from "react-router-dom";

const BASE_URL = "http://15.165.160.196:8008/api";

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
    const { config: original, response } = err;

    // response 자체가 없으면 (네트워크 에러, 연결 끊김 등) 여기서 바로 반환
    if (!response) {
      return Promise.reject(err);
    }

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
      await axios
        .post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        })
        .then((result) => {
          localStorage.setItem("accessToken", result.data.data.accessToken);
          localStorage.setItem("refreshToken", result.data.data.refreshToken);
          original.headers.Authorization = `Bearer ${result.data.data.accessToken}`;
          original.data = {
            refreshToken: result.data.data.refreshToken,
          };
        });
      return api(original);
    } catch (e) {}
    ["accessToken", "refreshToken", "userId", "userName", "role"].forEach((k) =>
      localStorage.removeItem(k),
    );

    return Promise.reject(e);
  },
);

export default api;
