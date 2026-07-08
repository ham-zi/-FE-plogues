import styled from "styled-components";
import { theme } from "../../../styles/theme";
export const ProofWrap = styled.div`
  width: 1000px;
  margin: 40px auto;
`;

export const ProofTitle = styled.h2`
  font-size: 34px;
  color: ${theme.color.text2};
  margin-bottom: 60px;

  &::after {
    content: "";
    display: block;
    width: 45px;
    height: 5px;
    background: ${theme.color.main};
    margin-top: 10px;
    border-radius: 999px;
  }
`;

export const ProofBox = styled.div`
  padding-bottom: 40px;
`;

export const PageInfo = styled.div`
  text-align: right;
  font-size: 15px;
  color: ${theme.color.text};
  margin-bottom: 25px;

  span {
    border: 1px solid ${theme.color.sub};
    color: ${theme.color.main};
    border-radius: 20px;
    padding: 3px 10px;
    margin: 0 8px;
    font-weight: 600;
  }
`;

export const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 50px;
`;

export const ProofCardBox = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;
  min-width: 0;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProofImage = styled.img`
  width: 100%;
  height: 170px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ProofMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 8px;
  font-size: 13px;
  color: ${theme.color.text};
`;

export const ProofDate = styled.span`
  color: ${theme.color.text};
`;

export const ProofCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.color.text2};
  margin: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WriterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .profile {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    background: ${theme.color.sub};
  }

  strong {
    font-size: 13px;
    color: ${theme.color.text2};
  }
`;
