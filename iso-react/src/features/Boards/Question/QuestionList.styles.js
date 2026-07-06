import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Page = styled.div`
  min-height: 100vh;
  background: ${theme.color.background};
  padding: 40px 70px;
  color: ${theme.color.text};
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 30px;

  &::after {
    content: "";
    display: block;
    width: 38px;
    height: 4px;
    margin-top: 10px;
    background: ${theme.color.main};
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

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const Thead = styled.thead`
  background: ${theme.color.point};
`;

export const Th = styled.th`
  padding: 16px 12px;
  text-align: center;
  color: ${theme.color.text2};
  font-weight: 700;
`;

export const Td = styled.td`
  padding: 15px 12px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
`;

export const TitleTd = styled(Td)`
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${theme.color.main};
    font-weight: 700;
  }
`;

export const Status = styled.span`
  font-weight: 700;
  color: ${({ $status }) =>
    $status === "처리완료" ? theme.color.main : theme.color.delete};
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
