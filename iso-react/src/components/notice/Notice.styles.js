// Notice.styles.js
import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #fbfbec;
  padding: 48px 80px;
`;

export const Header = styled.div`
  margin-bottom: 64px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #4b4b4b;
  margin-bottom: 10px;
`;

export const WriteButton = styled.button`
  background: #2f9b92;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #247f78;
  }
`;

export const TopArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 24px;
  padding-right: 20px;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #444;
  font-size: 16px;
`;

export const PageBadge = styled.span`
  border: 1px solid #777;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 13px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px 42px;
`;

export const NoticeCard = styled.div`
  width: 200px;
  height: 150px;
  background: white;
  border-radius: 14px;
  padding: 22px 24px;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 4px 8px 14px rgba(0, 0, 0, 0.25);
  }
`;

export const Category = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #168b84;
  margin-bottom: 24px;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #555;
  line-height: 1.4;
  margin-bottom: 36px;
`;

export const DateText = styled.div`
  font-size: 10px;
  color: #c7c7c7;
`;
