import React, { useEffect, useState } from "react";
import {
  Container,
  LeftSection,
  ProfileImage,
  ProfileImageWrapper,
  ProfileOverlay,
  StatsContainer,
  StatItem,
  ActionButton,
  RightSection,
  FormHeader,
  InputGroup,
  DeleteButton,
  RightSideWrapper,
  InputUser,
  StyledInput,
  SaveBtn,
  CancelBtn,
} from "./styles/MyPage.styles";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { customAlert } from "../../Commons/Alert";

const Mypage = () => {
  const { user } = useAuth();
  const navi = useNavigate();
  const [file, setFile] = useState(null);

  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    email: "",
    info: "",
    joinCount: 0,
    plogWeight: 0,
    treeCount: 0,
    fileUrl: "",
  });

  const [Loading, isLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.userId) return;

      try {
        isLoading(true);
        const response = await api.get(`/users`);
        if (response.data && response.data.data) {
          setUserInfo(response.data.data);
        } else {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("회원 정보 로드 실패:", error);
      } finally {
        isLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!userInfo.userId) {
      customAlert.error("사용자 ID를 찾을 수 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("info", userInfo.info || "");
    if (file) formData.append("file", file);

    try {
      const response = await api.patch(`/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      customAlert.success("프로필을 성공적으로 수정하였습니다.");
    } catch (err) {
      customAlert.error("프로필 수정에 실패했습니다.");
    }
  };

  if (Loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <LeftSection>
        <ProfileImageWrapper
  onClick={() => document.getElementById("fileInput").click()}
>
  <ProfileImage
    $imgUrl={
      file
        ? URL.createObjectURL(file)
        : userInfo.fileUrl
        ? `${userInfo.fileUrl}?t=${new Date().getTime()}`
        : null
    }
  />
  <ProfileOverlay data-overlay="true">변경</ProfileOverlay>

  <input
    id="fileInput"
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: "none" }}
  />
</ProfileImageWrapper>

        <InputUser>
          <StyledInput type="text" value={userInfo.userId} readOnly />
          <StyledInput type="text" value={userInfo.userName} readOnly />
        </InputUser>

        <StatsContainer>
          <StatItem>
            <div>{userInfo.joinCount}</div>
            <p>참여 횟수</p>
          </StatItem>
          <StatItem>
            <div>{userInfo.treeCount}</div>
            <p>심은 나무 갯수</p>
          </StatItem>
          <StatItem>
            <div>{userInfo.plogWeight}kg</div>
            <p>총 쓰레기 무게</p>
          </StatItem>
        </StatsContainer>

        <ActionButton onClick={() => navi("/mypage")}>회원정보</ActionButton>
        <ActionButton onClick={() => navi("/mypage/joins")}>
          나의 활동
        </ActionButton>
      </LeftSection>

      <RightSection>
        <FormHeader>
          <h3>기본 정보</h3>
          <div>
            <CancelBtn type="button" onClick={() => window.location.reload()}>
              취소
            </CancelBtn>
            <SaveBtn type="button" onClick={handleSave}>
              저장
            </SaveBtn>
          </div>
        </FormHeader>

        <InputGroup>
          <label>이메일</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
        </InputGroup>

        <InputGroup>
          <label>자기 소개</label>
          <textarea
            rows="4"
            name="info"
            value={userInfo.info || ""}
            onChange={handleInputChange}
          />
        </InputGroup>

        <RightSideWrapper>
          <DeleteButton onClick={() => navi("/delete")}>회원탈퇴</DeleteButton>
        </RightSideWrapper>
      </RightSection>
    </Container>
  );
};

export default Mypage;