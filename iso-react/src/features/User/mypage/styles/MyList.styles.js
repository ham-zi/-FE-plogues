import styled, { keyframes } from "styled-components";
import { theme } from "../../../../styles/theme";

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
// 공통 CSS
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  max-width: 1100px; /* 추가 */
  margin: 40px auto; /* 가운데 정렬 */
  padding: 30px 20px; /* 기존보다 줄임 */

  gap: 55px; /* 프로필과 리스트 사이 여백 */
  animation: ${fadeUp} 0.5s ease;
`;

export const LeftSection = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #2c6e63;
  border: 3px solid #ddd;
  margin-bottom: 20px;
  object-fit: cover;
`;

export const StatsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin: 25px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
`;

export const StatItem = styled.div`
  text-align: center;

  div {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    color: #777;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
  background: ${theme.color.sub};
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

export const RightSection = styled.div`
  width: 800px;
`;

export const Title = styled.h3`
  margin-bottom: 25px;
`;

export const TableWrapper = styled.div`
  background: #fff9df;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  overflow-x: auto;
`;
export const Table = styled.table`
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;

  th {
    border-bottom: 2px solid #ddd;
    padding: 14px;
    font-size: 14px;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 14px;
  }

  td:first-child,
  th:first-child {
    text-align: left;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 90px;
  }

  th:nth-child(6),
  td:nth-child(6) {
    width: 90px;
  }
`;

export const StateBadge = styled.span`
  padding: 5px 14px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  cursor: ${({ state }) => (state === "참여" ? "pointer" : "default")};

  background: ${({ state }) => {
    switch (state) {
      case "참여":
        return theme.color.main;
      case "참여불가":
        return "#d9534f";
      default:
        return "#888";
    }
  }};
`;
export const StateBadge2 = styled.span`
  padding: 5px 14px;
  border-radius: 20px;
  color: white;
  font-size: 12px;
  cursor: ${({ state }) => state === "진행 중"};

  background: ${({ state }) => {
    switch (state) {
      case "진행 중":
        return theme.color.sub;
      case "완료":
        return "#555555";
      default:
        return "#888";
    }
  }};
`;
export const CancelBtn = styled.button`
  padding: 5px 14px;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: ${theme.color.sub};
  font-size: 12px;
  cursor: pointer;
`;

export const Select = styled.select`
  width: 180px;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 15px;
  cursor: pointer;
`;

export const TableTitle = styled.h4`
  margin-bottom: 18px;
  font-size: 18px;
  font-weight: 700;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
`;

export const Dropdown = styled.div`
  width: 180px;
  position: relative;
`;

export const DropdownHeader = styled.div`
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    border-color: ${theme.color.sub};
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: 20;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.li`
  list-style: none;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${theme.color.sub};
    color: white;
  }
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  margin-top: 30px;
  margin-bottom: 20px;

  button {
    width: 35px;
    height: 35px;

    border: 1px solid #ddd;
    border-radius: 50%;

    background-color: white;
    color: #333;

    cursor: pointer;

    font-size: 18px;

    &:hover {
      background-color: #f3f3f3;
    }

    &:disabled {
      cursor: default;
      color: #bbb;
      background-color: #fafafa;
    }
  }

  span {
    font-size: 16px;
    font-weight: 600;
    color: #555;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const AcceptButton = styled.button`
  width: 70px;
  height: 34px;
  border: none;
  border-radius: 6px;
  background-color: #4caf50;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #43a047;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const DenyButton = styled.button`
  width: 70px;
  height: 34px;
  border: none;
  border-radius: 6px;
  background-color: #f44336;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 28px;
  margin: 20px 0;
  border-bottom: 1px solid #e5e5e5;
`;

export const Tab = styled.button`
  padding: 12px 4px;
  background: none;
  border: none;
  cursor: pointer;

  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#34908B" : "#777")};

  border-bottom: ${({ $active }) =>
    $active ? "3px solid #34908B" : "3px solid transparent"};

  transition: 0.2s;

  &:hover {
    color: ${theme.color.main};
  }
`;
