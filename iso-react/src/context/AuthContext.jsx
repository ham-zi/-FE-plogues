import { useState, createContext, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { customAlert } from "../features/Commons/Alert";

// 보관함 만들기
const AuthContext = createContext(null);

// 보관함에 값 넣고 나눠주는 역할
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;
    return {
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      role: localStorage.getItem("role"),
    };
  });

  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("role", data.role);
    setUser({
      userId: data.userId,
      userName: data.userName,
      role: data.role,
    });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await customAlert.confirm("정말 로그아웃 하시겠습니까?");
    if (!res) return;
    try {
      const result = await api.post("/auth/logout", { refreshToken });
      if (result.status === 200) {
        ["accessToken", "refreshToken", "userId", "userName", "role"].forEach(
          (k) => localStorage.removeItem(k),
        );
      }
      window.location.href = "/";
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
