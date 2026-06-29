import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 40px auto;
  padding: 24px;
  background: #fffdf2;
  border: 1px solid #eee;
  border-radius: 10px;
`;

export const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  color: #555;
`;

export const Td = styled.td`
  padding: 14px 12px;
  border-bottom: 1px solid #eee;
  color: #333;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 7px 14px;
  color: white;
  cursor: pointer;
  margin-right: 8px;
`;

export const AcceptButton = styled(Button)`
  background: #2563eb;

  &:hover {
    background: #1d4ed8;
  }
`;

export const RejectButton = styled(Button)`
  background: #f97316;

  &:hover {
    background: #ea580c;
  }
`;

/* 버튼 공통 */
const ChatButton = styled.button`
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    opacity: 0.85;
  }
`;

/* 참여 버튼 */
export const JoinButton = styled(ChatButton)`
  background: #2f9994;
`;

/* 참여 취소 버튼 */
export const CancelButton = styled(ChatButton)`
  background: #378f8a;
`;

/* 참여 불가 버튼 */
export const DisabledButton = styled(ChatButton)`
  background: #94383b;
`;
