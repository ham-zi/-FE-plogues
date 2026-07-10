import {
  Bar,
  Inner,
  Brand,
  Nav,
  NavLink,
  Login,
  AuthGroup,
  UserName,
  AuthLink,
} from "./Header.styles";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import biomas from "../../../assets/biomas-energy.svg";

const Header = () => {
  const navi = useNavigate();
  const { isLogin, logout, user } = useAuth();

  const isAdmin = user?.role === "[ROLE_ADMIN]";

  return (
    <Bar>
      <Inner>
        <Brand onClick={() => navi("/")}>
          <img src={biomas} alt="biomas" />
          Plogues
        </Brand>

        <Nav>
          <NavLink onClick={() => navi("/notices")}>소식</NavLink>
          <NavLink onClick={() => navi("/joins/plogging")}>플로깅모집</NavLink>
          <NavLink onClick={() => navi("/joins/plant")}>식목모집</NavLink>
          <NavLink onClick={() => navi("/proofs")}>인증게시판</NavLink>
          <NavLink onClick={() => navi("/reviews")}>후기게시판</NavLink>
        </Nav>

        <AuthGroup>
          {isLogin ? (
            <>
              {isAdmin && (
                <AuthLink onClick={() => navi("/reports")}>신고목록</AuthLink>
              )}

              <AuthLink onClick={() => navi("/questions/page")}>
                문의사항
              </AuthLink>

              <AuthLink onClick={() => navi("/mypage")}>내정보</AuthLink>

              <UserName>{user.userName}님</UserName>

              <Login onClick={logout}>로그아웃</Login>
            </>
          ) : (
            <>
              <AuthLink onClick={() => navi("/signup")}>회원가입</AuthLink>
              <Login onClick={() => navi("/login")}>로그인</Login>
            </>
          )}
        </AuthGroup>
      </Inner>
    </Bar>
  );
};

export default Header;
