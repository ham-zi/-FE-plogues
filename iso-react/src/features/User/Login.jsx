import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState("");

  const navi = useNavigate();

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };

  const onChangePwd = (e) => {
    setUserPwd(e.target.value);
  };

  const onSubmit = () => {
    if (!userId || !userPwd) {
      setStatus("아이디와 비밀번호를 꼭 입력해주세요");
      return;
    }

    isLoading(true);
    setStatus("");

    api
      .post("/auth/login", {
        userId,
        userPwd,
      })
      .then((result) => {
        //응답데이터를 어딘가에 저장
        // 저장할 수 있는 공간
        // Cookie:세션방식 / Local storage / Session storage
        // local과 session의 차이점 session은 브라우저를 종료하면 삭제됨
        // localStorage.setItem("token", result.data.accessToken);
        // alert(localStorage.getItem("token"));
        const el = result.data;
        login(el.data);
        console.log(result.data);
        navi("/");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.code === 400) {
          setStatus(err.response.data.message);
        } else {
          setStatus("로그인에 실패했습니다.");
        }
        isLoading(false);
      });
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") onSubmit();
  };

  // 팀별 실습?!!!
  // 회원 가입 기능 구현하기
  // 팀별로 회원 테이블, 회원가입 로직, 회원가입 앞단
  // 시큐리티Config 복사해서 사용해도 ㄱㅊ
  // 회원가입 시에는 필요없으니 제거

  return (
    <div>
      <div>
        <h3>로그인</h3>
        <p>로그인을 진행합니다</p>

        <fieldset>
          <label>아이디</label>
          <input
            onChange={onChangeId}
            onKeyDown={onKeyDown}
            placeholder="아이디를 입력하세요."
          ></input>
        </fieldset>
        <fieldset>
          <label>비밀번호</label>
          <input
            onChange={onChangePwd}
            onKeyDown={onKeyDown}
            placeholder="비밀번호를 입력하세요."
          ></input>
        </fieldset>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? "로그인 하는 중..." : "로그인"}
        </button>
        {status.length > 0 && <span>{status}</span>}
      </div>
    </div>
  );
};

export default Login;
