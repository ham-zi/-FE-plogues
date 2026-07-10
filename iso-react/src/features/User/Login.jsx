import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Wrapper,
  ImageArea,
  Inner,
  Title,
  Subtitle,
  Fieldset,
  Label,
  Input,
  Btn,
  Status,
} from "./Login.styles";
import Card from "../../assets/Card.svg";

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
        const el = result.data;
        login(el.data);
        navi("/");
      })
      .catch((err) => {
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

  return (
    <Wrapper>
      <ImageArea>
        <img src={Card} alt="Card" />
      </ImageArea>

      <Inner>
        <Title>Plogues</Title>
        <Subtitle>로그인을 진행합니다</Subtitle>

        <Fieldset>
          <Label>아이디</Label>
          <Input
            onChange={onChangeId}
            onKeyDown={onKeyDown}
            placeholder="아이디를 입력하세요."
          />
        </Fieldset>
        <Fieldset>
          <Label>비밀번호</Label>
          <Input
            type="password"
            onChange={onChangePwd}
            onKeyDown={onKeyDown}
            placeholder="비밀번호를 입력하세요."
          />
        </Fieldset>
        <Btn onClick={onSubmit} disabled={loading}>
          {loading ? "로그인 하는 중..." : "로그인"}
        </Btn>
        {status.length > 0 && <Status>{status}</Status>}
      </Inner>
    </Wrapper>
  );
};

export default Login;
