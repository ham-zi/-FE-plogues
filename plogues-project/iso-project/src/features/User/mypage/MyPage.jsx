import React, { useEffect, useState } from "react";
import {
  Container,
  LeftSection,
  ProfileImage,
  StatsContainer,
  StatItem,
  ActionButton,
  RightSection,
  FormHeader,
  InputGroup,
  FileUploadBox,
  DeleteButton,
  RightSideWrapper,
  InputUser,
  StyledInput,
  SaveBtn,
  CancelBtn,
} from "./styles/MyPage.styles";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios"; // 커스텀 axios 인스턴스

const Mypage = () => {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    email: "",
    info: "",
    joinCount: 0,
    ploggingWeight: 0,
    treeCount: 0,
    fileUrl: "",
  });

  const [Loading, isLoading] = useState(true);

  // 초기 회원 정보 로드 (조회)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.userId) return; // AuthContext에 유저 정보가 들어올 때까지 대기

      try {
        isLoading(true);
        const response = await api.get(`/users/${user.userId}`);

        // 서버 응답의 data 객체를 state에 통째로 저장
        if (response.data && response.data.data) {
          setUserInfo(response.data.data);
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

  // 4. [저장] 버튼 클릭 시 서버로 수정된 정보 전송 (수정)
  const handleSave = async () => {
    try {
      // 프로젝트 스펙에 맞게 PUT 혹은 PATCH 선택, 엔드포인트 수정 필요
      const response = await api.patch(`/users/${userInfo.userId}`, {
        email: userInfo.email,
        info: userInfo.info,
        // 필요에 따라 userName 등을 추가 전송
      });

      if (response.data && response.data.code === 200) {
        alert(response.data.msg); // "프로필 수정 성공" 알림
        // 서버에서 수정 후 최신 데이터를 다시 보내준다면 state 업데이트
        setUserInfo(response.data.data);
      }
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  if (Loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <LeftSection>
        {/* 서버에서 준 프로필 이미지 url이 있다면 보여주고, 없으면 기본 이미지(또는 빈값) */}
        <ProfileImage src={userInfo.fileUrl} alt="프로필 이미지" />

        <InputUser>
          <StyledInput type="text" value={userInfo.userId} readOnly />
          <StyledInput type="text" value={userInfo.userName} />
        </InputUser>

        <StatsContainer>
          <StatItem>
            <div>{userInfo.joinCount}</div>
            <p>참여 횟수</p>
          </StatItem>
          {/* JSON 예시의 treeCount 항목을 반영했습니다. 필요시 원래대로 posts로 교체 가능합니다. */}
          <StatItem>
            <div>{userInfo.treeCount}</div>
            <p>심은 나무 갯수</p>
          </StatItem>
          <StatItem>
            <div>{userInfo.ploggingWeight}kg</div>
            <p>총 쓰레기 무게</p>
          </StatItem>
        </StatsContainer>

        <ActionButton>회원정보</ActionButton>
        <ActionButton>게시글 내역 목록</ActionButton>
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
            value={userInfo.info}
            onChange={handleInputChange}
          />
        </InputGroup>

        <RightSideWrapper>
          <h4>프로필 사진 변경</h4>
          <FileUploadBox>
            <span>이미지 or 파일 첨부</span>
          </FileUploadBox>
          <DeleteButton>회원탈퇴</DeleteButton>
        </RightSideWrapper>
      </RightSection>
    </Container>
  );
};

export default Mypage;
