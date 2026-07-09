import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Page = styled.div`
  min-height: 100vh;
  background: ${theme.color.background};
  padding: 70px 120px;
  color: ${theme.color.text};
`;

export const FormContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 35px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${theme.color.text};
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;

  span {
    color: ${theme.color.delete};
    margin-left: 2px;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  outline: none;

  &:focus {
    border-color: ${theme.color.main};
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 12px;
  outline: none;
  background: white;

  &:focus {
    border-color: ${theme.color.main};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 230px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 14px 12px;
  resize: none;
  outline: none;

  &:focus {
    border-color: ${theme.color.main};
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 45px;
`;

export const SubmitButton = styled.button`
  width: 130px;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: ${theme.color.main};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${theme.color.sub};
  }
`;

export const CancelButton = styled.button`
  width: 130px;
  height: 42px;
  border: 1px solid ${theme.color.main};
  border-radius: 10px;
  background: white;
  color: ${theme.color.main};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${theme.color.point};
  }
`;
