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

export const ProofWrap = styled.div`
  width: 1000px;
  margin: 40px auto;
  animation: ${fadeUp} 0.5s ease;
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
  width: 100%;
  padding-top: 50px;
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
  grid-template-columns: repeat(4, 230px);
  justify-content: center;
  column-gap: 24px;
  row-gap: 36px;
`;

export const ProofCardBox = styled.div`
  width: 230px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProofImage = styled.img`
  width: 230px;
  height: 220px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
  background: #eee;
`;
export const ProofMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 13px;
  color: ${theme.color.text};
`;

export const ProofDate = styled.span`
  font-size: 12px;
  color: #777;
`;

export const ProofCardTitle = styled.div`
  margin-top: 8px;
  font-size: 15px;
  font-weight: 700;
  color: ${theme.color.text};
  line-height: 1.4;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WriterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .profile {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    object-fit: cover;
  }

  strong {
    font-size: 13px;
    font-weight: 600;
  }
`;
