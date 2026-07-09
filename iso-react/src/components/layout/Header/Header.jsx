import {
  Bar,
  Inner,
  Brand,
  Nav,
  NavLink,
  Login,
  AuthGroup,
} from "./Header.styles";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import biomas from "../../../assets/biomas-energy.svg";

const Header = () => {
  const navi = useNavigate();
  const { isLogin, logout, user } = useAuth();

  return (
    <Bar>
      <Inner>
        <Brand onClick={() => navi("/")}>
          <img src={biomas} alt="biomas" />
          Plogues
        </Brand>

        {/* 게시판 메뉴만 담당 */}
        <Nav>
          <NavLink onClick={() => navi("/notices")}>소식</NavLink>
          <NavLink onClick={() => navi("/joins/plogging")}>
            플로깅게시판
          </NavLink>
          <NavLink onClick={() => navi("/joins/plant")}>식목게시판</NavLink>
          <NavLink onClick={() => navi("/proofs")}>인증게시판</NavLink>
          <NavLink onClick={() => navi("/boards")}>후기게시판</NavLink>
        </Nav>

        {/* 로그인 버튼들만 따로 분리 (AuthGroup 사용) */}
        <AuthGroup>
          {isLogin ? (
            <>
              <div
                style={{ color: "#444", fontSize: "14px", fontWeight: "600" }}
              ></div>
              {user.role === "[ROLE_ADMIN]" && (
                <NavLink onClick={() => navi("/reports")}>신고목록</NavLink>
              )}
              <NavLink onClick={() => navi("/questions/page")}>
                문의사항
              </NavLink>
              <NavLink onClick={() => navi("/mypage")}>내정보조회</NavLink>
              <Login
                onClick={async () => {
                  await logout();
                  navi("/");
                }}
              >
                로그아웃
              </Login>
            </>
          ) : (
            <>
              <Login onClick={() => navi("/signup")}>회원가입</Login>
              <Login onClick={() => navi("/login")}>로그인</Login>
            </>
          )}
        </AuthGroup>
      </Inner>
    </Bar>
  );
};

export default Header;
