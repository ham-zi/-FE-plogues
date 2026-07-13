import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ImageArea,
  Inner,
  Title,
  Subtitle,
  FormGrid,
  Fieldset,
  Label,
  Input,
  Button,
  Status,
  ErrorText,
} from "./SignUp.styles";
import Card from "../../assets/Card.svg";
import { customAlert } from "../Commons/Alert";

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
    if (
      !userId ||
      !userPwd ||
      !userPwdConfirm ||
      !userName ||
      !email ||
      !phone ||
      !address
    ) {
      setStatus("모든 항목을 입력해주세요.");
      return;
    }

    const reg = /^[a-zA-Z0-9]{4,20}$/;

    if (!reg.test(userId)) {
      setStatus(
        "아이디는 영어 또는 숫자로 이루어진 4글자 이상 20자 이하여야 합니다.",
      );
      return;
    }
    if (!reg.test(userPwd)) {
      setStatus(
        "비밀번호는 영어 또는 숫자로 이루어진 4글자 이상 20자 이하여야 합니다.",
      );
      return;
    }

    const regName = /^[a-zA-Z가-힣0-9]{2,20}$/;
    if (!regName.test(userName)) {
      setStatus(
        "이름은 영어, 한글, 숫자로 이루어진 2글자에서 20글자 입력이 가능합니다.",
      );
      return;
    }

    if (email.length > 20) {
      setStatus("이메일은 20글자까지 입력이 가능합니다.");
      return;
    }

    if (phone.length > 11) {
      setStatus("전화번호는 11글자까지 숫자만 입력이 가능합니다.");
      return;
    }

    if (address.length > 100) {
      setStatus("거주지는 100글자까지 입력이 가능합니다.");
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
          customAlert.success("회원가입 성공");
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
    <Container>
      {/* 좌측: 폼 영역 */}
      <Inner>
        <Title>Plogues</Title>
        <Subtitle>서비스 이용을 위하여 계정을 생성해 주십시오.</Subtitle>

        {/* 2열 배치를 위한 FormGrid */}
        <FormGrid>
          <Fieldset>
            <Label>이름</Label>
            <Input onChange={onChangeName} placeholder="이름을 입력하세요." />
          </Fieldset>

          <Fieldset>
            <Label>아이디</Label>
            <Input onChange={onChangeId} placeholder="아이디를 입력하세요." />
          </Fieldset>

          <Fieldset>
            <Label>이메일</Label>
            <Input
              onChange={onChangeEmail}
              placeholder="이메일을 입력하세요."
            />
          </Fieldset>

          <Fieldset>
            <Label>전화번호</Label>
            <Input
              onChange={onChangePhone}
              placeholder="전화번호를 입력하세요."
            />
          </Fieldset>

          <Fieldset>
            <Label>비밀번호</Label>
            <Input
              type="password"
              onChange={onChangePwd}
              placeholder="비밀번호를 입력하세요."
            />
          </Fieldset>

          <Fieldset>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              onChange={onChangePwdConfirm}
              placeholder="비밀번호를 한 번 더 입력하세요"
            />
            {userPwdConfirm.length > 0 && userPwd !== userPwdConfirm && (
              <ErrorText $type="error">비밀번호가 일치하지 않습니다.</ErrorText>
            )}
          </Fieldset>

          <Fieldset>
            <Label>거주지</Label>
            <Input
              onChange={onChangeAddress}
              placeholder="거주지를 입력하세요."
            />
          </Fieldset>
        </FormGrid>

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "가입 중..." : "회원 가입"}
        </Button>
        {status.length > 0 && <Status>{status}</Status>}
      </Inner>

      <ImageArea>
        <img src={Card} alt="Card" />
      </ImageArea>
    </Container>
  );
};

export default SignUp;
