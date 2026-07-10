import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/axios";
import { customAlert } from "../Commons/Alert";
import { useAuth } from "../../context/AuthContext";
import { theme } from "../../styles/theme";

const Delete = () => {
  const [userPwd, setUserPwd] = useState("");
  const navi = useNavigate();
  const { logout } = useAuth();

  const handleWithdraw = async () => {
  console.log("1. 시작");
  if (!userPwd) {
    customAlert.error("비밀번호를 입력해주세요.");
    return;
  }

  console.log("2. confirm 뜨기 직전");
  const isConfirmed = await customAlert.confirm(
    "정말 탈퇴하시겠습니까?",
    "삭제된 정보는 복구할 수 없습니다."
  );
  console.log("3. confirm 결과:", isConfirmed);

  if (!isConfirmed) return;

  try {
    console.log("4. delete 요청 시작");
    const res = await api.delete(`/users`, { data: { userPwd } });
    console.log("5. delete 응답:", res);

    console.log("6. success 알럿 뜨기 직전");
    await customAlert.success("회원 탈퇴가 완료되었습니다.");
    console.log("7. success 알럿 닫힘");

    ["accessToken", "refreshToken", "userId", "userName", "role"].forEach(
      (k) => localStorage.removeItem(k)
    );
    console.log("8. 토큰 삭제 완료:", localStorage.getItem("accessToken"));

    window.location.href = "/";
  } catch (err) {
  const msg = err.response?.data?.message || "탈퇴 처리 중 오류가 발생했습니다.";
  
  // 403이면 이미 유효하지 않은 계정/토큰일 가능성이 높으니 강제 로그아웃 처리
  if (err.response?.status === 403) {
    ["accessToken", "refreshToken", "userId", "userName", "role"].forEach(
      (k) => localStorage.removeItem(k)
    );
    customAlert.error("세션이 만료되었거나 이미 처리된 계정입니다.");
    window.location.href = "/";
    return;
  }
  
  customAlert.error(msg);
}
  };
  return (
    <Wrapper>
      <Card>
        <Title>Plogues</Title>
        <SubText>회원 탈퇴 전, 비밀번호를 확인해주세요.</SubText>
        <WarningText>탈퇴 시 계정 정보는 복구할 수 없습니다.</WarningText>

        <Label>비밀번호</Label>
        <Input
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={userPwd}
        onChange={(e) => setUserPwd(e.target.value)}
        onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleWithdraw();
    }
  }}
/>

        <DeleteBtn type="button" onClick={handleWithdraw}>
          회원 탈퇴
        </DeleteBtn>
        <CancelBtn type="button" onClick={() => navi(-1)}>
          취소
        </CancelBtn>
      </Card>
    </Wrapper>
  );
};

export default Delete;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #fffdf2;
`;

const Card = styled.div`
  width: 400px;
  padding: 48px 40px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${theme.color.main};
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 15px;
  color: ${theme.color.text2};
  margin-bottom: 4px;
`;

const WarningText = styled.p`
  font-size: 13px;
  color: ${theme.color.delete};
  margin-bottom: 28px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.color.text2};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 92%;
  padding: 14px 16px;
  border: none;
  border-radius: 8px;
  background-color: #e6f0ee;
  font-size: 14px;
  margin-bottom: 32px;

  &::placeholder {
    color: #9db3af;
  }

  &:focus {
    outline: 2px solid ${theme.color.main};
  }
`;

const DeleteBtn = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.color.delete};
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelBtn = styled.button`
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.color.text2};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;