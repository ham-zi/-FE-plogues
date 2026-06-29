import styled from "styled-components";

export const JoinWrap = styled.div`
  width: 1050px;
  margin: 50px auto;
`;

export const JoinTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 26px;
  }

  button {
    background-color: #2f8f83;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 7px 14px;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const PageInfo = styled.div`
  text-align: right;
  margin: 30px 0 15px;
  font-size: 13px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px 24px;
`;

export const Card = styled.div`
  position: relative;
  height: 170px;
  border-radius: 14px;
  padding: 18px;
  background-color: ${(props) => props.$bg || "#70c7b8"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
`;

export const Badge = styled.div`
  position: absolute;
  top: -14px;
  left: 18px;
  background-color: #7b4dff;
  color: white;
  border-radius: 7px;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: bold;
`;

export const CardTitle = styled.h3`
  margin-top: 30px;
  font-size: 15px;
  text-align: center;
`;

export const MemberRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 18px 0;

  span {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f3b36b;
    border: 2px solid white;
    margin-left: -6px;
  }
`;

export const CardBottom = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 45px;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .active {
    font-weight: bold;
    color: #7b4dff;
  }
`;