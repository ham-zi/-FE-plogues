import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Bar = styled.header`
  width: 100%;
  height: 80px;
  background: #fefdf4;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

export const Inner = styled.div`
  max-width: 100%;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* 양 끝 정렬의 핵심 */
  align-items: center;
  padding: 0 20px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 800;
  color: ${theme.color.logo};
  cursor: pointer;
  margin-right: 40px; /* 로고와 메뉴 사이 간격 확보 */
`;

// 메뉴 영역

export const Nav = styled.nav`
  flex: 1; /* 남은 공간을 차지하되 */
  display: flex;
  justify-content: flex-start; /* 핵심: 메뉴를 왼쪽으로 붙임 */
  gap: 30px; /* 메뉴 간 간격 */
  align-items: center;
`;

export const NavLink = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #4b7e41;
  cursor: pointer;
  white-space: nowrap;
  padding: 8px 12px;
  border-radius: 20px;
`;

// 버튼 영역 (로그인/회원가입/로그아웃)
export const AuthGroup = styled.div`
  flex: 0 0 auto; /* 버튼들도 필요한 만큼만 차지 */
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Login = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${theme.color.main};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
`;
