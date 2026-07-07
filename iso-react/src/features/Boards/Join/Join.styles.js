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

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px 24px;
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

export const Card = styled.div`
  position: relative;
  width: 300px;
  height: 220px;
  border-radius: 14px;
  padding: 25px;
  background-color: ${(props) => props.$bg};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  margin: 50px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const Badge = styled.div`
  position: absolute;
  top: -15px;
  left: 30px;
  background-color: #8e44ad;
  color: white;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CardTitle = styled.h3`
  margin: 40px 0 0 0;
  font-size: 22px;
  text-align: center;
  color: #2c3e50;
  font-weight: 800;
`;

export const LeaderText = styled.p`
  margin: 8px 0 0 0;
  text-align: center;
  font-size: 14px;
  color: white;
  opacity: 0.9;
`;

export const MemberRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Avatar = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  margin-left: -12px;
  background-color: #f39c12;

  &:first-child {
    margin-left: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #cddc39;
  width: ${(props) => props.$percent};
  transition: width 0.3s ease-in-out;
`;

export const DateBadge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.25);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BottomSection = styled.div`
  margin-top: auto;
  padding-bottom: 30px;
`;

export const PageInfo = styled.div`
  text-align: right;
  margin: 20px 0 10px;
  font-size: 13px;
  justify-content: flex-end;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  margin: 20px 0;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    min-width: 30px;
    text-align: center;
  }
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  background-color: transparent;
  color: #4a5568;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: transparent;
    color: #1a202c;
  }

  &:active:not(:disabled) {
    background-color: transparent;
    opacity: 0.7;
  }

  &:disabled {
    background-color: transparent;
    color: #cbd5e0;
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
