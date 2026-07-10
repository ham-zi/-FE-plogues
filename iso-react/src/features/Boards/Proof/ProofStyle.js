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

export const FormWrap = styled.div`
  width: 860px;
  margin: 60px auto;
  color: #222;
`;

export const FormTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  padding-bottom: 20px;
  border-bottom: 2px solid #222;
  margin-bottom: 30px;
`;

export const FormRow = styled.div`
  margin-bottom: 25px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;

    .required {
      color: #e57373;
      margin-left: 2px;
    }
  }

  input[type="text"] {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
  }

  textarea {
    width: 100%;
    height: 160px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 14px;
    font-family: inherit;
    resize: none;
    box-sizing: border-box;
    outline: none;
  }
`;

export const SelectBox = styled.select`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
`;

export const FileDropContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const FileDropBox = styled.label`
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  border: 1.5px dashed #ccc;
  border-radius: 12px;
  color: #999;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
  box-sizing: border-box;

  input {
    display: none;
  }

  svg {
    font-size: 32px;
    color: #999;
  }

  &:hover {
    border-color: #3f8f72;
    color: #3f8f72;

    svg {
      color: #3f8f72;
    }
  }
`;

export const PreviewZone = styled.div`
  position: relative;

  img {
    width: 180px;
    height: 130px;
    object-fit: cover;
    border-radius: 8px;
  }

  .delete-btn {
    position: absolute;
    top: -8px;
    right: -8px;

    width: 22px;
    height: 22px;

    border-radius: 50%;
    border: none;

    background: #c74141;
    color: white;

    cursor: pointer;
  }
`;

export const FormButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;

  button {
    padding: 10px 30px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .submit-white {
    background: white;
    border: 1px solid #3f8f72;
    color: #3f8f72;
  }

  .cancel-green {
    background: #3f8f72;
    color: white;
    border: none;
  }
`;
