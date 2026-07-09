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
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios"; // 커스텀 axios 인스턴스
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

  // 초기 회원 정보 로드 (조회)
  useEffect(() => {
    const fetchUserData = async () => {
      // 1. user 객체와 userId가 존재하는지 확인
      if (!user || !user.userId) {
        console.log("로그: user.userId가 아직 준비되지 않음");
        return;
      }

      try {
        isLoading(true);
        // 오타 수정: useruserId -> user.userId
        const response = await api.get(`/users`);
        console.log("서버 응답 데이터 확인:", response.data);

        // 서버 응답 구조에 따라 데이터 저장

        // response.data.data가 있는지 확인하고, 없으면 response.data 전체를 시도

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
  }, [user]); // user가 변경될 때마다 실행

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // [저장] 버튼 클릭 시 서버로 수정된 정보 전송 (수정)

  const handleFileChange = (e) => {
    // BoardForm 방식과 동일하게 파일 선택 시 상태 업데이트
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    // 1. 데이터가 아예 없는지 확인
    if (!userInfo.userId) {
      customAlert.error("사용자 ID를 찾을 수 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("info", userInfo.info);
    if (file) formData.append("file", file);

    try {
      const response = await api.patch(`/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      customAlert.success("프로필을 성공적으로 수정하였습니다.");
      console.log("서버 응답:", response);
    } catch (err) {
      // 에러가 났을 때 서버가 왜 응답이 없는지 강제로 띄웁니다.
      console.error("서버 응답 없음 또는 에러:", err);
      customAlert.error("프로필 수정에 실패했습니다.");
    }
  };

  if (Loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <LeftSection>
        <ProfileImage
          src={
            userInfo.fileUrl
              ? `${userInfo.fileUrl}?t=${new Date().getTime()}`
              : null
          }
          alt="프로필 이미지"
        />

        <InputUser>
          <StyledInput type="text" value={userInfo.userId} readOnly />

          <StyledInput type="text" value={userInfo.userName} readOnly />
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
          <h4>프로필 사진 변경</h4>

          <FileUploadBox
            onClick={() => document.getElementById("fileInput").click()}
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="미리보기"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={userInfo.fileUrl}
                alt="프로필"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </FileUploadBox>

          <DeleteButton onClick={() => navi("/delete")}>회원탈퇴</DeleteButton>
        </RightSideWrapper>
      </RightSection>
    </Container>
  );
};

export default Mypage;
