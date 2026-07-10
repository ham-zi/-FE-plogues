import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";

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
/* 전체 */
export const Container = styled.div`
  display: flex;
  flex-direction: row; /* 좌우 배치를 위해 명시 */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fdfcf6;
  font-family: "Noto Sans KR", sans-serif;
  animation: ${fadeUp} 0.4s ease;
`;

/* 새로 추가된 우측 이미지 공간 확보용 컴포넌트 */
export const ImageArea = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 20px;
  margin-left: 80px; /* 폼과의 간격 (이번엔 우측이므로 margin-left) */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-weight: bold;
  font-size: 18px;
`;

/* 내부 박스 (폼 영역) */
export const Inner = styled.div`
  width: 100%;
  max-width: 700px;
`;

/* 타이틀 */
export const Title = styled.h3`
  font-size: 28px;
  font-weight: 900;
  color: #3b978d;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 30px;
`;

/* input 묶음 */
export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

/* label */
export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
`;

/* 👉 Login이랑 동일한 input 색 */
export const Input = styled.input`
  background-color: #e7f7f6;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 15px;
  outline: none;

  &:focus {
    outline: 1px solid #3b978d;
  }
`;

/* 버튼 (Login이랑 통일) */
export const Button = styled.button`
  margin-top: 20px;

  background-color: #3b978d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  justify-self: start;

  transition: 0.2s ease;

  &:hover {
    background-color: #2f7f76;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* 에러/상태 */
export const Status = styled.span`
  grid-column: span 2;
  margin-top: 10px;
  color: #e53e3e;
  font-size: 13px;
  display: block;
`;

export const ErrorText = styled.p`
  margin: 16px 0 0;
  font-size: 13px;
  text-align: center;
  color: ${({ $type }) =>
    $type === "error"
      ? theme.color.danger
      : $type === "success"
        ? theme.color.success
        : theme.color.danger};
`;
