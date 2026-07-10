import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  width: 900px;
  margin: 40px auto;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputArea = styled.div`
  margin-bottom: 25px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  font-family: sans-serif;
  font-size: 15px;
  line-height: 1.5;

  resize: none;
  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: ${theme.color.sub};
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.15);
  }

  &::placeholder {
    color: #999;
    font-family: sans-serif;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 15px;
`;

export const Button = styled.button`
  width: 80px;
  height: 38px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background: ${(props) => (props.primary ? "#2a9d8f" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#2a9d8f")};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const RefreshButton = styled.div`
  display: flex;
  color: #555555;
  font-weight: bold;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  padding-top: 12px;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 15px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin-bottom: 10px;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #eee;
`;

export const UserInfo = styled.div`
  width: 170px;
  display: flex;
`;

export const ProfileCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${(props) => props.color};
  margin-right: 12px;
  margin-top: 2px;
`;

export const UserText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

export const Date = styled.div`
  font-size: 11px;
  color: #777;
  margin-top: 4px;
  line-height: 15px;
`;

export const MessageText = styled.div`
  flex: 1;
  font-size: 15px;
`;

export const ActionIcons = styled.div`
  display: flex;
  gap: 15px;
  font-size: 20px;
  color: #2a9d8f;
  svg {
    cursor: pointer;
    transition: 0.2s;
  }
  svg:hover {
    transform: scale(1.15);
  }
`;

export const SubTitle = styled.h3`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 28px;
`;

export const Edited = styled.span`
  color: #999;
  font-size: 12px;
  margin-left: 5px;
`;

export const EditArea = styled.div`
  width: 100%;
  margin-top: 15px;
`;
export const EditButtonArea = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const BackIcon = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  color: #34908b;

  transition: 0.2s ease;

  &:hover {
    transform: translateX(3px);
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;
