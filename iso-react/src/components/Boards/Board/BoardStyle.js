import styled from "styled-components";

export const BoardWrap = styled.div`
  width: 860px;
  margin: 60px auto;
  color: #222;
`;

export const BoardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 28px;
    margin: 0;
  }

  button {
    background-color: #3f8f72;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 7px 14px;
    font-size: 13px;
    cursor: pointer;
  }
`;

export const BoardInfo = styled.p`
  font-size: 14px;
  margin: 8px 0 30px;
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #222;
  border-bottom: 1px solid #777;

  th {
    height: 45px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #999;
  }

  td {
    height: 52px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  td:nth-child(2) {
    text-align: left;
    padding-left: 20px;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 55px;

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background-color: #eee;
    color: #777;
    cursor: pointer;
  }

  .active {
    background-color: #555;
    color: white;
  }
`;