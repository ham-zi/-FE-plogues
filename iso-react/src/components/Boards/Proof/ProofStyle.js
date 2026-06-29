import styled from "styled-components";

export const ProofWrap = styled.div`
  width: 1000px;
  margin: 40px auto;
`;

export const ProofTitle = styled.h2`
  font-size: 34px;
  color: #4b4b4b;
  margin-bottom: 80px;

  &::after {
    content: "";
    display: block;
    width: 45px;
    height: 6px;
    background-color: #2f9c8f;
    margin-top: 8px;
  }
`;

export const ProofBox = styled.div`
  background-color: #fff;
  border-radius: 14px;
  padding: 35px 40px 45px;
`;

export const PageInfo = styled.div`
  text-align: right;
  font-size: 16px;
  margin-bottom: 25px;

  span {
    border: 1px solid #555;
    border-radius: 4px;
    padding: 2px 8px;
    margin: 0 12px;
  }
`;

export const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px 60px;
`;

export const ProofCardBox = styled.div`
  cursor: pointer;
`;

export const ProofImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const ProofMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 6px;
  font-size: 12px;
`;

export const WriterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .profile {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #f3a0a0;
  }

  strong {
    font-size: 12px;
  }
`;

export const ProofDate = styled.span`
  color: #555;
`;

export const ProofCardTitle = styled.h3`
  font-size: 17px;
  margin: 0;
  font-weight: 800;
`;