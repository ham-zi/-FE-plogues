import styled, { keyframes } from "styled-components";
import { theme } from "../../../../styles/theme";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  padding: 60px;
  background-color: #fcfcf0;
  min-height: 100vh;
  animation: ${fadeUp} 0.5s ease;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

export const ProfileImage = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #2c6e63;
  background-image: ${(props) =>
    props.$imgUrl ? `url(${props.$imgUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border: 3px solid #e0e0e0;
`;

export const ProfileInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #a8d5cf;
  border-radius: 4px;
  text-align: center;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
`;

export const StatItem = styled.div`
  text-align: center;
  div {
    font-weight: 800;
    font-size: 20px;
  }
  p {
    font-size: 11px;
    color: #555;
    margin-top: 5px;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: none;
  background-color: ${theme.color.sub};
  color: white;
  font-weight: bold;
  font-size: 17px;
  cursor: pointer;
`;

export const RightSection = styled.div`
  width: 500px;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const InputGroup = styled.div`
  margin-bottom: 25px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 14px;
  }
  input,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid ${theme.color.point};
    border-radius: 4px;
    background-color: transparent;
  }
`;

export const InputUser = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

// 2. 인풋 전용 스타일을 따로 생성
export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid ${theme.color.sub};
  border-radius: 4px;
  font-size: 14px;
  text-align: center;

  &:focus {
    border-color: #007bff; /* 포커스 되었을 때 테두리 색상 변화 */
    outline: none;
  }
`;

export const SaveBtn = styled.button`
  padding: 4px 8px;
  margin: 3px;
  border-radius: 5px;
  border: none;
  background: ${theme.color.sub};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
export const CancelBtn = styled.button`
  padding: 4px 8px;
  margin: 3px;
  border-radius: 5px;
  border: none;
  background: #bebebe;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

// 우측 정렬용 서브 컨테이너
export const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  margin-left: auto;
  margin-top: 30px;
`;
export const FileUploadBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  margin-bottom: 25px;
  cursor: pointer;
  color: #888;
`;
export const DeleteButton = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 32px;
  border-radius: 6px;
  border: none;
  background-color: #d97474;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;


export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 20px;
  overflow: hidden;

  &:hover div[data-overlay="true"] {
    opacity: 1;
  }
`;

export const ProfileOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const ProfileHint = styled.p`
  font-size: 12px;
  color: #8a9a96;
  margin: -8px 0 16px;
  text-align: center;
`;