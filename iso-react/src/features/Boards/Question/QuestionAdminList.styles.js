import styled, { keyframes } from "styled-components";
import { theme } from "../../../styles/theme";

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

export const Page = styled.div`
  min-height: 100vh;
  background: ${theme.color.background};
  padding: 40px 70px;
  color: ${theme.color.text};
  animation: ${fadeUp} 0.5s ease;
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin: 0;

  &::after {
    content: "";
    display: block;
    width: 38px;
    height: 4px;
    margin-top: 10px;
    background: ${theme.color.main};
  }
`;

export const UserTitle = styled(Title)`
  font-size: 22px;

  &::after {
    display: none;
  }
`;

export const WriteButton = styled.button`
  width: 104px;
  height: 36px;
  border: none;
  border-radius: 20px;
  background: ${theme.color.main};
  color: white;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${theme.color.sub};
  }
`;

export const FilterArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 14px;
`;

export const Select = styled.select`
  height: 34px;
  border: none;
  border-radius: 8px;
  padding: 0 12px;
  background: ${theme.color.point};
  color: ${theme.color.text2};
  font-weight: 600;
`;

export const SearchInput = styled.input`
  width: 180px;
  height: 34px;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  background: #f7f5ef;
  outline: none;
`;

export const TableWrap = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const UserTableWrap = styled.div`
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Thead = styled.thead`
  background: ${theme.color.point};
`;

export const UserThead = styled.thead`
  background: transparent;
  border-bottom: 1px solid #d9d9c8;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #e5e5e5;
`;

export const UserTr = styled.tr`
  border-bottom: 1px solid #e5e5d8;
`;

export const Th = styled.th`
  padding: 16px 12px;
  text-align: center;
  color: ${theme.color.text2};
  font-weight: 700;
`;

export const UserTh = styled(Th)`
  padding: 14px 8px;
  text-align: left;
  color: ${theme.color.text};

  &:nth-child(1) {
    width: 90px;
    color: #888;
    font-weight: 500;
  }

  &:nth-child(3) {
    width: 120px;
    text-align: center;
  }

  &:nth-child(4) {
    width: 140px;
    text-align: center;
  }
`;

export const Td = styled.td`
  padding: 15px 12px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
`;

export const UserTd = styled(Td)`
  padding: 15px 8px;
  text-align: left;
  border-bottom: none;
  color: ${theme.color.text};

  &:nth-child(1) {
    color: #888;
  }

  &:nth-child(3),
  &:nth-child(4) {
    text-align: center;
  }
`;

export const TitleTd = styled(Td)`
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${theme.color.main};
    font-weight: 700;
  }
`;

export const UserTitleTd = styled(UserTd)`
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: ${theme.color.main};
  }
`;

export const Status = styled.span`
  font-weight: 700;
  color: ${({ $status }) =>
    $status === "처리완료" || $status === "답변 완료"
      ? theme.color.main
      : theme.color.delete};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  min-width: 58px;
  padding: 5px 8px;
  border: 1px solid #d7d7d7;
  border-radius: 5px;
  background: white;
  color: ${theme.color.text};
  font-size: 12px;
  font-weight: 700;
  line-height: 1;

  background-color: ${({ status }) =>
    status === "COMPLETED" || status === "Y" ? "#a3e9b3" : "#FFF3CD"};

  color: ${({ status }) =>
    status === "COMPLETED" || status === "Y" ? "#41bd3d" : "#B7791F"};
`;

export const EmptyText = styled.div`
  padding: 60px 0;
  text-align: center;
  color: #999;
  font-size: 15px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 32px;
`;

export const PageButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? theme.color.text : "white")};
  color: ${({ $active }) => ($active ? "white" : "#777")};
  cursor: pointer;

  &:hover {
    background: ${theme.color.sub};
    color: white;
  }
`;

export const CompleteButton = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: ${theme.color.main};
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.color.sub};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.color.main};
    color: #fff;
    cursor: not-allowed;
    transform: none;
  }

  &:disabled:hover {
    background: ${theme.color.main};
  }
`;
