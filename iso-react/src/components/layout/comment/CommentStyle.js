import styled from "styled-components";

// 전체 레이아웃 배경 (은은한 베이지색)
export const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fafbf7;
  min-height: 100vh;
  font-family: sans-serif;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;

// 댓글 입력창 상자
export const CommentInputBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;

  textarea {
    width: 100%;
    height: 80px;
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    color: #9ca3af;
  }
`;

// 버튼 정렬용 컨테이너
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

// 기본 테두리 버튼 (작성 버튼 등)
export const OutlineButton = styled.button`
  border: 1px solid #148c82;
  color: #148c82;
  background-color: #fff;
  padding: 6px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #148c82;
    color: #fff;
  }
`;

// 꽉 찬 버튼 (취소 버튼 등)
export const FilledButton = styled.button`
  background-color: #148c82;
  color: #fff;
  border: none;
  padding: 6px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

// 댓글 리스트 아이템 종류
export const CommentItem = styled.div`
  border-b: 1px solid #e5e7eb;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

export const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
`;

export const ProfileCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#ccc"};
  margin-right: 12px;
`;

export const CommentContent = styled.div`
  flex: 1;

  .meta {
    display: flex;
    align-items: center;
    gap: 8px;

    .author {
      font-weight: bold;
      font-size: 14px;
      color: #333;
    }
    .date {
      font-size: 12px;
      color: #9ca3af;
    }
  }

  .text {
    font-size: 14px;
    color: #4b5563;
    margin-top: 4px;
  }
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 6px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
`;

// 수정 박스 전용
export const EditBox = styled.div`
  margin-top: 16px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #4b5563;
  }

  textarea {
    width: 100%;
    height: 80px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px;
    font-size: 14px;
    resize: none;
    outline: none;
    &:focus {
      border-color: #148c82;
    }
  }
`;
