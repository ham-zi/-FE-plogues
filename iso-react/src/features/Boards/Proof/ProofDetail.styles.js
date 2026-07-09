import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { Link } from "react-router-dom";

export const Page = styled.div`
  min-height: 100vh;
  background: #fbfae8;
  padding: 40px 0;
`;

export const Container = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 2px solid #d8d8c8;
  margin-bottom: 45px;
`;

export const HeaderIcon = styled.div`
  font-size: 28px;
  color: ${theme.color.text};
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: ${theme.color.text};
`;

export const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const ReadBox = styled.div`
  width: 100%;
  min-height: 52px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  font-size: 15px;
  color: ${theme.color.text};
  box-sizing: border-box;
`;

export const Label = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${theme.color.text};
  margin-left: 22px;

  &::before {
    content: "•";
    margin-right: 8px;
  }
`;

export const ContentBox = styled(ReadBox)`
  min-height: 140px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

export const ImageRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 130px;
  margin-top: 5px;
`;

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ImageBox = styled.div`
  width: 285px;
  height: 170px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
`;
export const DetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const ListButton = styled.button`
  width: 170px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid ${theme.color.main};
  background: white;
  color: ${theme.color.main};
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.18);

  &:hover {
    background: ${theme.color.point};
  }
`;

export const ActivityLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  width: fit-content;

  color: ${theme.color.main};
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  margin-right: 10px;
  padding: 8px 14px;
  border: 1px solid ${theme.color.main};
  border-radius: 8px;
  background: white;
  transition: 0.2s;

  &:hover {
    background: ${theme.color.point};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DetailTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ReportButton = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #ffe8e8;
  color: ${theme.color.delete};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${theme.color.delete};
    color: white;
  }
`;
