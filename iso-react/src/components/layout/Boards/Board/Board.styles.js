import styled from "styled-components";

export const Container = styled.div`
  width: 90%;
  margin: 50px auto;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 4px solid #63c8c1;
  display: inline-block;
`;

export const SearchArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 230px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 15px;
  outline: none;
`;

export const Select = styled.select`
  width: 100px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const SearchButton = styled.button`
  width: 70px;
  height: 38px;
  border: none;
  border-radius: 8px;
  background: #63c8c1;
  color: white;
  cursor: pointer;

  &:hover {
    background: #45b4ab;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #43b5ff;
`;

export const Thead = styled.thead`
  background: #9de6d8;
`;

export const Th = styled.th`
  padding: 15px;
  font-size: 14px;
`;

export const Td = styled.td`
  padding: 15px;
  border-top: 1px solid #ddd;
  text-align: center;
`;

export const Tr = styled.tr`
  &:hover {
    background: #f8f8f8;
  }
`;

export const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;

export const PageButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: ${(props) => (props.active ? "#666" : "#eee")};
  color: ${(props) => (props.active ? "white" : "black")};

  &:hover {
    background: #888;
    color: white;
  }
`;