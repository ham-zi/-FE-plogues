import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Bar = styled.header`
  width: 100%;
  height: 78px;
  background: rgba(254, 253, 244, 0.96);
  border-bottom: 1px solid rgba(75, 126, 65, 0.15);
  display: flex;
  align-items: center;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 36px;
  display: flex;
  align-items: center;
  gap: 36px;
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 27px;
  font-weight: 800;
  color: ${theme.color.logo};
  cursor: pointer;
  white-space: nowrap;

  img {
    width: 42px;
    height: 42px;
  }
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 26px;
`;

export const NavLink = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #3f7139;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  padding: 28px 0;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 20px;
    width: 0;
    height: 2px;
    background: ${theme.color.main};
    transform: translateX(-50%);
    transition: 0.2s;
  }

  &:hover {
    color: ${theme.color.main};
  }

  &:hover::after {
    width: 100%;
  }
`;

export const AuthGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  white-space: nowrap;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const AuthLink = styled.button`
  border: none;
  background: transparent;
  color: #333;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${theme.color.main};
  }
`;

export const Login = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: ${theme.color.main};
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 5px 12px rgba(52, 144, 139, 0.2);

  &:hover {
    background: #2f817d;
  }
`;
