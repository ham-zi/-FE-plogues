import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userPwdConfirm, setChangePwdConfirm] = useState("");

  const [loading, isLoading] = useState(false);
  const [status, setStatus] = useState("");
  const navi = useNavigate();

  const onChangeId = (e) => {
    setUserId(e.target.value);
  };
  const onChangePwd = (e) => {
    setUserPwd(e.target.value);
  };
  const onChangePwdConfirm = (e) => {
    setChangePwdConfirm(e.target.value);
  };
  const onChangeName = (e) => {
    setUserName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onSubmit = () => {
    if (!userId || !userPwd || !userPwdConfirm || !userName) {
      setStatus("모든 항목을 입력해주세요.");
      return;
    }

    const reg = /^[a-zA-Z0-9]{5,20}$/;

    if (!reg.test(userId)) {
      setStatus(
        "아이디는 영어 또는 숫자로 이루어진 5글자 이상 20자 이하여야 합니다.",
      );
      return;
    }

    const regName = /^[가-힣0-9]{2,20}$/;
    if (!regName.test(userName)) {
      setStatus(
        "사용자 이름은 한글로 이루어진 2글자에서 20글자 입력이 가능합니다.",
      );
      return;
    }
    setStatus("");
    isLoading(true);

    api
      .post("/users", {
        userId,
        userPwd,
        userName,
        email,
        phone,
        address,
      })
      .then((result) => {
        if (result.status === 201) {
          setStatus("회원가입 성공");
          setTimeout(() => {
            navi("/");
          }, 2000);
        }
      })
      .catch((err) => {
        setStatus(err.response.data.message);
        isLoading(false);
      });
  };

  return (
    <div>
      <div>
        <h3>회원가입</h3>
        <p>서비스 이용을 위하여 계정을 생성해 주십시오.</p>

        <fieldset>
          <label>아이디</label>
          <input onChange={onChangeId} placeholder="아이디를 입력하세요." />
        </fieldset>
        <fieldset>
          <label>이름</label>
          <input onChange={onChangeName} placeholder="이름을 입력하세요." />
        </fieldset>
        <fieldset>
          <label>비밀번호</label>
          <input
            type="password"
            onChange={onChangePwd}
            placeholder="비밀번호를 입력하세요."
          />
        </fieldset>
        <fieldset>
          <label>비밀번호 확인</label>
          <input
            type="password"
            onChange={onChangePwdConfirm}
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          {userPwdConfirm.length > 0 && userPwd != userPwdConfirm && (
            <p>비밀번호가 일치하지 않습니다.</p>
          )}
        </fieldset>
        <fieldset>
          <label>이메일</label>
          <input onChange={onChangeEmail} placeholder="이메일을 입력하세요." />
        </fieldset>
        <fieldset>
          <label>전화번호</label>
          <input
            onChange={onChangePhone}
            placeholder="전화번호를 입력하세요."
          />
        </fieldset>
        <fieldset>
          <label>거주지</label>
          <input
            onChange={onChangeAddress}
            placeholder="거주지를 입력하세요."
          />
        </fieldset>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? "가입 중..." : "가입하기"}
        </button>
        {status.length > 0 && <span>{status}</span>}
      </div>
    </div>
  );
};

export default SignUp;
