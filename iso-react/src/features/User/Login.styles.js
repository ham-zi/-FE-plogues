import styled, { keyframes } from "styled-components";

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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row; /* 좌우 배치를 위해 추가 */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fdfcf6;
  font-family: "Noto Sans KR", sans-serif;
  animation: ${fadeUp} 0.4s ease;
`;

/* 새로 추가된 이미지 공간 확보용 컴포넌트 */
export const ImageArea = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 20px;
  margin-right: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-weight: bold;
  font-size: 18px;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h3`
  font-size: 36px;
  font-weight: 900;
  color: #3b978d;
  margin: 0 0 10px 0;
  padding: 20px 0; /* 기존 20px에서 좌우 여백 제거로 폼과 정렬 */
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
`;

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 20px 0;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const Input = styled.input`
  background-color: #e7f7f6;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 15px;
  outline: none;
`;

export const Btn = styled.button`
  background-color: #3b978d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Btn2 = styled.button`
  background-color: white;
  border: 2px solid #a5e9dd;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  color: #3b978d;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Status = styled.span`
  color: #e53e3e;
  font-size: 13px;
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #999;
  font-size: 12px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
  }

  span {
    padding: 0 10px;
  }
`;
